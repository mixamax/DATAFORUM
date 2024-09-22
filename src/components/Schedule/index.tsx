import styles from "./schedule.module.css";

interface IScheduleProps {
    children: React.ReactNode;
}

export function Schedule({ children }: IScheduleProps) {
    return (
        <section className={styles["schedule-container"]}>{children}</section>
    );
}
