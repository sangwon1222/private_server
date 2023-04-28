import express from "express";
import jwt from "jsonwebtoken";
import * as util from "../util";

export default class AuthController {
  /**** 로그인
   * @param id string
   * @param pw string
   */
  static async signIn(req: express.Request, res: express.Response) {
    try {
      // const decode = {
      //   id: util.getDecodedData(req.body.id),
      //   pw: util.getDecodedData(req.body.pw),
      // };
      const decode = {
        id: req.body.id,
        pw: req.body.pw,
      };

      //DB에 계정 조회
      const { ok, result, error } = await util.checkAccount(
        decode.id,
        decode.pw
      );
      if (!ok) {
        return res.json({
          ok: false,
          code: res.statusCode,
          message: error,
          result: {},
        });
      }
      // DB에 계정이 있으면 access토큰 발행
      const { idx, userName, teamId } = result;

      // token발행
      const accessToken = jwt.sign({ type: "JWT", id: decode.id }, `${idx}`, {
        expiresIn: "1m",
        issuer: `${decode.id}`,
      });
      const refreshToken = jwt.sign({ type: "JWT", id: decode.id }, `${idx}`, {
        expiresIn: "14d",
        issuer: "cotak",
      });

      return res.json({
        ok: true,
        code: 200,
        message: "토큰이 발급되었습니다.",
        result: {
          userName,
          accessToken,
          refreshToken,
          account: idx,
          teamId,
        },
      });
    } catch (e) {
      console.log("로그인 에러", e);
      return res.json({
        ok: false,
        code: res.statusCode,
        message: e,
        result: {},
      });
    }
  }

  static async accessTokenCheck(req: express.Request, res: express.Response) {
    console.log(req.body);
    res.json({ ok: true });
  }

  /**** 회원 가입
   * @param req encode된 id,pw,name,teamId
   * @param res {ok:boolean, error: string}
   */
  static async signUp(req: express.Request, res: express.Response) {
    try {
      const { id, pw, name, teamId } = req.body;
      const { ok } = await util.checkAccount(id, pw);
      if (ok) {
        res.json({
          ok: false,
          error: "이미 있는 계정입니다.",
        });
        return;
      }

      const DB = await util.Query(`
        INSERT INTO
          auth
          (userId,password,userName,teamId)
        VALUES
          ( '${id}', '${pw}','${name}','${teamId}' );
      `);
      console.log("DB", DB);
      res.json({ ok: true });
    } catch (e) {
      res.json({ ok: false, error: e });
    }
  }

  /**
   * @description 로그아웃
   */
  static async signOut(req: express.Request, res: express.Response) {
    res.json({ ok: true });
  }

  /**
   * @description 회원 조회
   */
  static async getUser(req: express.Request, res: express.Response) {
    const { id } = req.body;
    const { error, results, _fields } = await util.Query(`
    SELECT idx,userId, userName,teamId FROM
      auth
    WHERE
      userId='${id}'
    `);
    res.json({ ok: results.length === 1, result: results });
  }
}
