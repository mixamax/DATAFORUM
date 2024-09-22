// import { useState } from "react";
import { useGetData } from "../../hooks/useGetData";
// import { useSocket } from "../../hooks/useSocket";
import { Room } from "../Room";
import { Schedule } from "../Schedule";
import styles from "./main.module.css";

const sessionStatus = {
    willSoon: "ТРАНСЛЯЦИЯ СКОРО НАЧНЕТСЯ",
    start: "АКТИВНАЯ СЕССИЯ:",
    pause: "ТРАНСЛЯЦИЯ ПРИОСТАНОВЛЕНА",
    stop: "ТРАНСЛЯЦИЯ ЗАКОНЧЕНА",
    idle: "",
};

export function Main() {
    const { initData, roomStatus, isLoading, isError, currentEventID } =
        useGetData();
    console.log("RENFER MAIN");
    return (
        <main className={styles["main-container"]}>
            <h1 className={styles["main-room-title"]}>{`ЗАЛ ${
                initData?.name || ""
            }`}</h1>

            {!isLoading && !isError && initData && (
                <>
                    <Room />
                    <h2
                        className={`${styles["main-room-title"]} ${
                            styles[`main-room-title__${roomStatus}`]
                        }`}
                    >
                        {roomStatus === "start"
                            ? sessionStatus[roomStatus] +
                                  " " +
                                  initData.schedule.find(
                                      (item) => item.is_active
                                  )?.item.title || ""
                            : sessionStatus[roomStatus]}
                    </h2>

                    <Schedule
                        initData={initData}
                        currentEventID={currentEventID}
                        roomStatus={roomStatus}
                    />
                </>
            )}
        </main>
    );
}
