import { Request, RequestParamHandler, Response } from "express";
import { Channel } from "../entities/channel.entity";
import { getRepository } from "typeorm";
import { ChannelJoin } from "../entities/channeljoin.entity";

export class ChannelService {
  constructor() {}
  static create = async (req: Request, res: Response) => {
    try {
      const channelRepository = getRepository(Channel);
      await channelRepository.save({
        ...req.body,
      });
      res.send("채널 생성 완료");
    } catch (err) {
      res.send(err.sqlMessage);
    } finally {
      return;
    }
  };

  static join = async (req: Request, res: Response) => {
    try {
      const channelRepository = getRepository(Channel);
      const joinRepository = getRepository(ChannelJoin);
      const channel = await channelRepository.findOne({ id: req.body.channel });
      await joinRepository.save({
        email: req.body.email,
        channel: channel,
      });
      res.send("채널 가입 성공");
    } catch (err) {
      res.send(err);
    } finally {
      return;
    }
  };

  static find = async (req: Request, res: Response) => {
    try {
      const joinRepository = getRepository(ChannelJoin);
      const email = req.params.email;
      const result = await joinRepository.find({ email });
      res.send(result.map((e) => e["channel"]));
    } catch (err) {
      res.send(err);
    } finally {
      return;
    }
  };

  static findAll = async (res: Response) => {
    try {
      const channelRepository = getRepository(Channel);
      const result = await channelRepository.find();
      res.send(result);
    } catch (err) {
      res.send(err);
    } finally {
      return;
    }
  };
  // static delete = async(req: Request, res: Response) => {
  //   try {
  //     const joinRepository = getRepository(ChannelJoin);

  //   } catch (err) {
  //     res.send(err)
  //   }
  // }
}
