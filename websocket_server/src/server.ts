import "dotenv/config";
import WebSocket, { WebSocketServer } from "ws";
import http from "http";
import { reqTypes, request } from "./types/incomingMessages";
import { UserManager } from "./lib/room";
import jwt from "jsonwebtoken";

const WSmanager = new UserManager();
const server = http.createServer();
const wss = new WebSocketServer({
  noServer: true,
});

/* Websocket logic */
wss.on("connection", (socket: WebSocket) => {
  socket.on("message", (data: string) => {
    const req: request = JSON.parse(data.toString());
    if (req.type === reqTypes.joinRoom) WSmanager.joinRoom(socket, req.message);
    if (req.type === reqTypes.sendMessage) WSmanager.emit(socket, req.message);
  });
});

wss.on("close", (socket: WebSocket) => {
  WSmanager.removeUser(socket);
});

/* Handle webSocket Authentication */
server.on("upgrade", (request, socket, head) => {
  const urlParams = new URLSearchParams(request.url.replace("/", ""));
  const token = urlParams.get("token");  

  if (!token) {
    socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
    socket.destroy();
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }

    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  });
});

server.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
