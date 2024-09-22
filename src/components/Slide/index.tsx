import styles from "./slide.module.css";
import { IScheduleItem } from "../../models/room/room";

interface ISlideProps {
    scheduleItem: IScheduleItem;
    isActive: boolean;
}

export function Slide({ scheduleItem, isActive }: ISlideProps) {
    return (
        <div className={styles["slide-container"]}>
            <div className={styles["slide-avatar-wrapper"]}>
                <img src="src/assets/images/avatar.png" alt="фото автора" />
            </div>
            <div className={styles["slide-text-wrapper"]}>
                <span className={styles["slide-text-theme"]}>
                    {scheduleItem.item.title}
                </span>
                <span className={styles["slide-text-name"]}>
                    {scheduleItem.item.subtitle}
                </span>
                <span className={styles["slide-text-regalia"]}>
                    {scheduleItem.item.text}
                </span>
            </div>
            <div
                className={`${styles["slide-time"]} ${
                    isActive && styles["slide-time__active"]
                }`}
            >
                {scheduleItem.timerange[0].slice(0, -3) +
                    " - " +
                    scheduleItem.timerange[1].slice(0, -3)}
            </div>
        </div>
    );
}
