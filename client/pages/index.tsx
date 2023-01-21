import { useEffect, useRef } from "react";
import { useSockets } from "@/context/socket.context";
import Rooms from "@/containers/Rooms";
import Messages from "@/containers/Messages";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const { socket, username, setUsername } = useSockets();
  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (usernameRef?.current) {
      usernameRef.current.value = localStorage.getItem("username") || "";
    }
  }, []);

  function handleUsername() {
    if (usernameRef?.current?.value) {
      const value = usernameRef.current.value;
      setUsername(value);
      localStorage.setItem("username", value);
    }
  }

  return (
    <div>
      {!username && (
        <div className={styles.usernameWrapper}>
          <div className={styles.usernameInner}>
            <input placeholder="Username" ref={usernameRef} />
            <button onClick={handleUsername}>START</button>
          </div>
        </div>
      )}
      {username && (
        <div className={styles.container}>
          <Rooms />
          <Messages />
        </div>
      )}
    </div>
  );
}
