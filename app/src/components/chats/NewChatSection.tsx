"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon } from "lucide-react";
import ChatBubble from "@/components/chats/ChatBubble";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { receivedMessagePayload, requestTypes } from "@/types/socketMessages";
import { useSocket } from "@/hooks/useSocket";
import { useRef } from "react";

interface IMessage {
    username: string;
    message: string;
    ownMessage?: boolean | false;
}

export default function ({ token, userID, username }: { token: string, userID: string, username: string }) {
    const params = useParams();
    const scrollRef = useRef<HTMLDivElement>(null);
    const { socket, connect, isConnected } = useSocket(token);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [inputText, setInputText] = useState("");
    const groupID = Array.isArray(params.groupID) ? null : params.groupID;
    const chatID = Array.isArray(params.chatID) ? null : params.chatID;

    useEffect(() => {
        if (!isConnected(socket)) connect(token)

        if (isConnected(socket)) {
            socket.send(
                JSON.stringify({
                    type: requestTypes.joinRoom,
                    message: chatID,
                })
            )
        }

        if (isConnected(socket)) socket.onmessage = (data: MessageEvent) => {
            const socketData = JSON.parse(data.data);
            const message: receivedMessagePayload = JSON.parse(socketData.message);
            if (message.userID === parseInt(userID)) return;

            setMessages((messages) => [
                ...messages,
                { username: message.username, message: message.message, ownMessage: false },
            ]);
        }

        return (
            () => {                
                if(isConnected(socket)) socket.close();
            }
        )
    }, [socket]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" , block: "end"});
        }
    }, [messages.length]);

    function handleSend() {
        if (!isConnected(socket)) return;
        socket.send(
            JSON.stringify({
                type: requestTypes.sendMessage,
                username: username,
                message: inputText,
                userID: parseInt(userID)
            })
        );
        setMessages((messages) => [
            ...messages,
            { username: username, message: inputText, ownMessage: true },
        ]);
        setInputText("");
    }

    if (!groupID || !chatID || !userID) return null;
    return (
        <>
            {/* New Chats appear here */}
            <div className="max-w-2xl w-full mx-auto py-2 flex flex-col gap-2 px-4">
                {messages.map((message, i) => (
                    <ChatBubble
                        key={i}
                        username={message.username}
                        message={message.message}
                        ownMessage={message.ownMessage}
                    />
                ))}
            </div>

            {/* Chat Input */}
            <div  className="max-w-2xl sticky bottom-0 w-full mx-auto py-2 flex flex-col gap-1.5 px-4 bg-white dark:bg-gray-950">
                <div className="relative">
                    <Textarea
                        placeholder="Message #general"
                        name="message"
                        id="message"
                        rows={1}
                        value={inputText}
                        onChange={e => setInputText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        className="min-h-[48px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm pr-16 dark:border-gray-800"
                    />
                    <Button
                        type="submit"
                        size="icon"
                        className="absolute top-3 right-3 w-8 h-8"
                        onClick={handleSend}
                    >
                        <ArrowUpIcon className="w-4 h-4" />
                        <span className="sr-only">Send</span>
                    </Button>
                </div>
                <p className="text-xs text-center text-neutral-700 font-medium">
                    Be kind and respectful in your messages.
                </p>
            </div>

            {/* to scroll into view */}
            <div ref={scrollRef}></div>
        </>
    );
}
