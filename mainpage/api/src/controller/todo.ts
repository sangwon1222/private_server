import express from "express";
import * as util from "../util";

export default class TodoController {
  static async getList(req: express.Request, res: express.Response) {
    console.log(res)
    res.header("Access-Control-Allow-Origin", "*");

    const data = await util.Query(`SELECT * FROM teamTodo`)
    res.json({ ok: true,data });
  }

}
