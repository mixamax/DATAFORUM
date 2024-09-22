import styles from "./pageLayout.module.css";

export function PageLayout({ children }: { children: React.ReactNode }) {
    return <div className={styles["page-layout"]}> {children}</div>;
}
