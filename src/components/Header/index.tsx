import styles from "./header.module.css";

export function Header() {
    return (
        <header className={styles["header-container"]}>
            <img src="src/assets/images/logo.png" height={57}></img>
        </header>
    );
}
