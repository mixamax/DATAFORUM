import styles from "./schedule.module.css";
import Swiper from "swiper";
import "swiper/css";
import { useEffect, useRef } from "react";
import { IRoomDTO } from "../../models/room/room";
import { Slide } from "../Slide";
import { RoomStatus } from "../../hooks/useGetData";

interface IScheduleProps {
    initData: IRoomDTO;
    currentEventID: number | null;
    roomStatus: RoomStatus;
}

export function Schedule({
    initData,
    currentEventID,
    roomStatus,
}: IScheduleProps) {
    return (
        <section className={styles["schedule-container"]}>
            <Slider
                initData={initData}
                currentEventID={currentEventID}
                roomStatus={roomStatus}
            />
        </section>
    );
}

function Slider({ initData, currentEventID, roomStatus }: IScheduleProps) {
    const ref = useRef(null);
    let swiper: Swiper;
    useEffect(() => {
        if (ref.current) {
            swiper = new Swiper(ref.current, {
                direction: "horizontal",
                slidesPerView: "auto",
                spaceBetween: 30,

                centeredSlides: true,
            });
        }
        const activeIndx = initData.schedule.findIndex(
            (item) => item.id === currentEventID
        );
        if (activeIndx === -1) {
            swiper.slideTo(0, 1000);
        } else {
            swiper.slideTo(activeIndx, 1000);
        }
    }, [initData, roomStatus, currentEventID]);
    return (
        <>
            <div
                className="swiper"
                style={{ height: "100%", overflow: "visible" }}
                ref={ref}
            >
                <div className="swiper-wrapper">
                    {initData.schedule.map((scheduleItem) => (
                        <div
                            className="swiper-slide"
                            style={{ width: "fit-content" }}
                            key={scheduleItem.id}
                        >
                            <Slide
                                scheduleItem={scheduleItem}
                                isActive={currentEventID === scheduleItem.id}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <button
                className={styles["swiper-button-left"]}
                onClick={() => swiper.slidePrev()}
            ></button>
            <button
                className={styles["swiper-button-right"]}
                onClick={() => swiper.slideNext()}
            ></button>
        </>
    );
}
