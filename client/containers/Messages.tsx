import EVENTS from "@/config/events";
import { useSockets } from "@/context/socket.context";
import React, { useEffect, useRef } from "react";
import styles from "@/styles/Messages.module.css";

function Messages() {
  const { socket, messages, roomId, username, setMessages } = useSockets();
  const newMessageRef = useRef<HTMLTextAreaElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSendMessage() {
    if (!newMessageRef?.current?.value) {
      return;
    }

    const message = newMessageRef.current.value;

    if (!String(message).trim()) {
      return;
    }

    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, { roomId, message, username });

    const _messages = messages ? messages : [];
    const date = new Date();

    setMessages([
      ..._messages,
      {
        username: "You",
        message,
        time: `${date.getHours()}:${date.getMinutes()}`,
      },
    ]);

    newMessageRef.current.value = "";
  }

  if (!roomId) {
    return <div />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.messageList}>
        {messages?.map(({ message, username, time }, index) => (
          <div key={index} className={styles.message}>
            <div className={styles.messageInner}>
              <span className={styles.messageSender}>
                {username} - {time}
              </span>
              <span className={styles.messageBody}>{message}</span>
            </div>
          </div>
        ))}
        <div ref={messageEndRef}></div>
      </div>

      <div className={styles.messageBox}>
        <textarea
          rows={1}
          placeholder="Tell us what you are thinking"
          ref={newMessageRef}
        ></textarea>
        <button onClick={handleSendMessage}>SEND</button>
      </div>
    </div>
  );
}

export default Messages;
