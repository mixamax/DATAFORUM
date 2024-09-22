import { useEffect } from "react";
import { useRoomStore } from "../store";

import { socket } from "../socket";
import { room, roomEvent } from "../constants";

export function useSocket() {
    const changeRoomConnected = (value: string) => {
        if (value === room + "_" + roomEvent) {
            console.log("связь с комнатой установлена");
        } else {
            console.log("связь с комнатой не установлена");
        }
    };

    const changeRoomStatus = (value: "start" | "stop" | "pause") => {
        if (value) {
            useRoomStore.getState().setRoomStatus(value);

            // сброс актвиного события при завершении?
            // if (value === "stop") {
            //     useRoomStore.getState().setCurrentEventID(null);
            // }
        }
    };

    const changeCurrentEventID = (value: string) => {
        const id = Number(value);
        if (id) {
            useRoomStore.getState().setCurrentEventID(id);
        }
    };

    useEffect(() => {
        socket.emit("room", room + "_" + roomEvent);
        socket.on("join", changeRoomConnected);
        socket.on("room-status", changeRoomStatus);
        socket.on("current-event", changeCurrentEventID);

        return () => {
            socket.off("join", changeRoomConnected);
            socket.off("room-status", changeRoomStatus);
            socket.off("current-event", changeCurrentEventID);
        };
    }, []);
}
