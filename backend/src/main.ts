import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routers/userRouter";
import channelRouter from "./routers/channelRouter";
import authRouter from "./routers/auth.Router";
import { ConnectionOptions, createConnection } from "typeorm";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { Chat } from "./models/chat.model";

const app = express();
const httpServer = createServer(app);
const swaggerSpec = YAML.load("./src/swagger/build.yaml");
app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/channel", channelRouter);
app.use("/", authRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
dotenv.config();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const Mysqlconfig: ConnectionOptions = {
  type: "mysql",
  host: process.env.DB_IP,
  port: 3306,
  username: "root",
  password: process.env.DB_PW,
  database: "myproject",
  synchronize: true,
  logging: true,
  entities: ["src/entities/*.ts"],
};

(async () => {
  await createConnection(Mysqlconfig);
})();

/* =================socket================= */
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (client: Socket) => {
  console.log("connected ", client.id);
  client.leave(client.id);
  client.data.roomId = `room:lobby`;
  client.join("room:lobby");

  client.on(
    "getMessage",
    async (msg: string, nickname: string): Promise<void> => {
      const date = new Date();
      client.to(client.data.roomId).emit("sendMessage", {
        nickname,
        message: msg,
        date,
      });
      const chat = new Chat({
        nickname,
        date,
        content: msg,
        channel: client.data.roomId,
      });
      await chat.save();
    }
  );

  client.on("enterChannel", async (roomId: string) => {
    if (client.rooms.has(roomId)) {
      return;
    }
    client.rooms.clear();
    client.data.roomId = roomId;
    client.join(roomId);
  });

  client.on("disconnect", () => {
    console.log("! disconnected ", client.id);
  });
});
/* ======================================== */

mongoose.connect(process.env.MONGODB);
console.log("hello");

httpServer.listen(3000);
