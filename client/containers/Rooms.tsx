import React, { useRef } from "react";
import { useSockets } from "@/context/socket.context";
import EVENTS from "@/config/events";
import styles from "@/styles/Room.module.css";

function Rooms() {
  const { socket, roomId, rooms } = useSockets();
  const newRoomRef = useRef<HTMLInputElement>(null);

  function handleCreateRoom() {
    if (!newRoomRef?.current?.value) {
      return;
    }

    const roomName = newRoomRef.current.value;
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });
    newRoomRef.current.value = "";
  }

  function handleJoinRoom(key: string) {
    if (key === roomId) {
      return;
    }

    socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
  }

  return (
    <nav className={styles.wrapper}>
      <div className={styles.createRoomWrapper}>
        <input ref={newRoomRef} placeholder="Room name" />
        <button onClick={handleCreateRoom}>CREATE ROOM</button>
      </div>

      {Object.keys(rooms).map((key) => (
        <div key={key}>
          <button
            disabled={key === roomId}
            title={`Join ${rooms[key].name}`}
            onClick={() => handleJoinRoom(key)}
          >
            {rooms[key].name}
          </button>
        </div>
      ))}
    </nav>
  );
}

export default Rooms;
