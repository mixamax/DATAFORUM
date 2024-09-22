import styles from "./chat.module.css";

const content = {
    title: "LIVE CHAT",
    msgs: [
        {
            user: "Иван Зурабьев",
            msg: "Спасибо Анне Анатольевне за очень интересный доклад!",
        },
        {
            user: "Екатерина Овсянина",
            msg: "Подскажите когда секция про Остеопороз у мужчин?",
        },
        {
            user: "Екатерина Овсянина",
            msg: "Вопрос спикеру:\nФакторы риска переломов бедра у мужчин?",
        },
    ],
};

export function Chat() {
    return (
        <div className={styles["chat-container"]}>
            <div className={styles["chat-title-container"]}>
                <h3 className={styles["title-text"]}>{content.title}</h3>
                <img src="src/assets/images/info.svg" height={27}></img>
            </div>
            <div className={styles["chat-msgs-field"]}>
                {content.msgs.map((msg, idx) => (
                    <div className={styles["chat-msg-container"]} key={idx}>
                        <div className={styles["chat-msg"]}>
                            <span className={styles["user-name"]}>
                                {msg.user}
                            </span>
                            <span className={styles["user-msg-text"]}>
                                {msg.msg}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <MsgInput />
        </div>
    );
}

function MsgInput() {
    return (
        <label className={styles["chat-msg-label"]}>
            <button className={styles["chat-msg-btn-question"]}></button>
            <input
                type="text"
                className={styles["chat-msg-input"]}
                placeholder="Введите сообщение"
            />
            <button className={styles["chat-msg-btn-smile"]}></button>
            <button
                className={styles["chat-msg-btn-send"]}
                aria-label="Send message"
            ></button>
        </label>
    );
}
