import express from "express";
import { ChannelService } from "../services/channel.service";

const channelRouter = express.Router();

// 채널 생성
channelRouter.post("/create", ChannelService.create);
// 채널 가입
channelRouter.post("/join", ChannelService.join);
// 가입한 채널목록 불러오기
channelRouter.get("/find", ChannelService.find);

export default channelRouter;
