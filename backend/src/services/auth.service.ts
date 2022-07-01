import { Request, Response } from "express";
import { User } from "../entities/user.entity";
import { getRepository } from "typeorm";
import dotenv from "dotenv";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
dotenv.config();

export class AuthService {
  constructor() {}
  static login = async (req: Request, res: Response) => {
    const userRepositrory = getRepository(User);
    const user = await userRepositrory.findOne({ email: req.body.email });
    if (!user) {
      res.status(422).json({ message: "이메일이 존재하지 않습니다." });
      return;
    }
    const pass = await bcrypt.compare(req.body.password, user.password);
    if (!pass) {
      res.status(401).json({ message: "비밀번호가 올바르지 않습니다." });
      return;
    }
    // const accessToken = jwt.sign(
    //   { email: user.email, nickname: user.nickname }, //
    //   process.env.ACCESS_TOKEN_KEY,
    //   { expiresIn: "1h" }
    // );
    // localStorage.setItem("AT", JSON.stringify(accessToken));
    res.send(true);
  };
}
