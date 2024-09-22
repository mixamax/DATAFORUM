import { memo } from "react";
import { useSocket } from "../../hooks/useSocket";
import { Chat } from "../Chat";
import styles from "./room.module.css";

export const Room = memo(function () {
    useSocket();
    return (
        <div className={styles["room-container"]}>
            <video
                className={styles["room-video"]}
                controls
                width="930"
                src="#"
                poster="src/assets/images/poster.jpg"
            ></video>
            <Chat />
        </div>
    );
});
