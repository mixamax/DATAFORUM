import { useEffect, useState } from "react";
import { getData } from "../services/apiService/initData";
import { IRoomDTO } from "../models/room/room";

import { socket } from "../socket";
import { room, roomEvent } from "../constants";

export type RoomStatus = "willSoon" | "start" | "stop" | "pause" | "idle";

export function useGetData() {
    const [initData, setInitData] = useState<IRoomDTO | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const [roomStatus, setRoomStatus] = useState<RoomStatus>("idle");
    const [currentEventID, setCurrentEventID] = useState<number | null>(null);

    console.log(initData, isLoading, isError, roomStatus, currentEventID);
    const changeRoomConnected = (value: string) => {
        if (value === room + "_" + roomEvent) {
            console.log("связь с комнатой установлена");
        } else {
            console.log("связь с комнатой не установлена");
        }
    };

    const changeRoomStatus = (
        value: Exclude<RoomStatus, "idle" | "willSoon">
    ) => {
        if (value) {
            setRoomStatus(value);
        }
    };

    const changeCurrentEventID = (value: string) => {
        if (value) {
            setCurrentEventID(Number(value));
        }
    };

    useEffect(() => {
        async function getInitData() {
            const data = await getData();
            setIsLoading(false);
            if (data) {
                setInitData(data);
                setRoomStatus(
                    getStatus(data.elapsed_time, data.is_running, data.is_ended)
                );
                setCurrentEventID(
                    data.schedule.find((item) => item.is_active === true)?.id ||
                        null
                );
                socket.emit("room", room + "_" + roomEvent);
                socket.on("join", changeRoomConnected);
                socket.on("room-status", changeRoomStatus);
                socket.on("current-event", changeCurrentEventID);
            } else {
                setIsError(true);
            }
        }

        getInitData();

        return () => {
            socket.off("join", changeRoomConnected);
            socket.off("room-status", changeRoomStatus);
            socket.off("current-event", changeCurrentEventID);
        };
    }, []);

    return { initData, roomStatus, isLoading, isError, currentEventID };
}

function getStatus(time: string, is_running: boolean, is_ended: boolean) {
    if (is_running) return "start";
    if (is_ended) return "stop";
    if (Number(time) && !is_running && !is_ended) return "pause";
    if (!Number(time) && !is_running && !is_ended) return "willSoon";
    return "idle";
}
