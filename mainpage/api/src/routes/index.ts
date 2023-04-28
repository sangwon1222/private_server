import * as express from "express";
import authRouter from "./auth";

const api: express.Router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 회원 정보
 */
api.use("/auth", authRouter);

export default api;
