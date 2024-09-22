import { create } from "zustand";

import { getData } from "../services/apiService/initData";
import { IRoomDTO, RoomStatus } from "../models/room/room";

type State = {
    initData: IRoomDTO | null;
    isLoading: boolean;
    isError: boolean;
    roomStatus: RoomStatus;
    currentEventID: number | null;
};

type Action = {
    setRoomStatus: (value: RoomStatus) => void;
    setCurrentEventID: (value: number | null) => void;
    getInitData: () => void;
};

export const useRoomStore = create<State & Action>((set) => ({
    initData: null,
    isLoading: true,
    isError: false,

    roomStatus: "idle",
    currentEventID: null,

    setRoomStatus: (value) => set({ roomStatus: value }),
    setCurrentEventID: (value) => set({ currentEventID: value }),

    getInitData: async () => {
        const data = await getData();

        set({ isLoading: false });
        if (data) {
            set({ initData: data });

            set({
                roomStatus: getStatus(
                    data.elapsed_time,
                    data.is_running,
                    data.is_ended
                ),
            });
            set({
                currentEventID: data.schedule.find((item) => item.is_active)
                    ?.id,
            });
        } else {
            set({ isError: true });
        }
    },
}));

function getStatus(time: string, is_running: boolean, is_ended: boolean) {
    if (is_running) return "start";
    if (is_ended) return "stop";
    if (Number(time) && !is_running && !is_ended) return "pause";
    if (!Number(time) && !is_running && !is_ended) return "willSoon";
    return "idle";
}
