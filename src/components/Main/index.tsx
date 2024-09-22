import { Room } from "../Room";
import { Schedule } from "../Schedule";
import { Slider } from "../Slider";
import styles from "./main.module.css";
import { useRoomStore } from "../../store";

const sessionStatus = {
    willSoon: "ТРАНСЛЯЦИЯ СКОРО НАЧНЕТСЯ",
    start: "АКТИВНАЯ СЕССИЯ:",
    pause: "ТРАНСЛЯЦИЯ ПРИОСТАНОВЛЕНА",
    stop: "ТРАНСЛЯЦИЯ ЗАКОНЧЕНА",
    idle: "",
};

export function Main() {
    const { initData, isLoading, isError, roomStatus, currentEventID } =
        useRoomStore();

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
                        {" "}
                        <span
                            style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {roomStatus === "start"
                                ? sessionStatus[roomStatus] +
                                      " " +
                                      initData.schedule.find(
                                          (item) => item.id === currentEventID
                                      )?.item.title || ""
                                : sessionStatus[roomStatus]}
                        </span>
                    </h2>

                    <Schedule>
                        <Slider
                            initData={initData}
                            currentEventID={currentEventID}
                            roomStatus={roomStatus}
                        />
                    </Schedule>
                </>
            )}
        </main>
    );
}
