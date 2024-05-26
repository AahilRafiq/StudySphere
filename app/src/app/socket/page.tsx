"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useSocket } from "@/hooks/useSocket";
import { messagePayload, requestTypes } from "@/types/socketMessages";

export default function () {
  const [messages, setMessages] = useState<string[]>(["hello", "wprld"]);
  const [text, setText] = useState("");
  const [room, setRoom] = useState("");
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    if (!isConnected(socket)) return;
    socket.onmessage = (message) => setMessages((messages) => [...messages, message.data]);
  }, [socket]);

  
  if (!isConnected(socket)) return <>Loading...</>;
  return (
    <>
      <p>Web sockets page</p>
      <input
        onChange={(e) => setRoom(e.target.value)}
        placeholder="Enter room ID"
      ></input>
      <Button
        onClick={() =>
          socket?.send(
            JSON.stringify({
              type: requestTypes.joinRoom,
              message: room,
            })
          )
        }
      >
        Join room
      </Button>
      <textarea
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter here"
        cols={50}
        rows={8}
        className=" border-4 border-blue-400 "
      />
      <Button
        onClick={() =>
          socket.send(
            JSON.stringify({
              type: requestTypes.sendMessage,
              message: text,
            })
          )
        }
      >
        Send
      </Button>

      <h1 className=" text-2xl">Messages</h1>
      <div className="flex flex-col min-h-96">
        {messages &&
          messages.map((message) => (
            <p key={Math.random() * 10000}>{message}</p>
          ))}
      </div>
    </>
  );
}
// abd -> abcd

// function to calculate index and character inserted or deleted based on change in whole text before and after
    function calculateChange(before:string , after:string) {
        let i = 0;
        while (i < before.length && i < after.length && before[i] == after[i]) {
            i++;
        }
        if (i == before.length && i == after.length) return { index: -1, char: '' };
        if (i == before.length) return { index: i, char: after[i] };
        if (i == after.length) return { index: i, char: '' };
        return { index: i, char: after[i] };
    }
