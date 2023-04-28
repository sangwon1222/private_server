import * as express from "express";
import authRouter from "./auth";
import todoRouter from "./todo";
import hashtagRouter from "./tag";
import listRouter from "./list";

const api: express.Router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 회원 정보
 */
api.use("/auth", authRouter);

/**
 * @swagger
 * tags:
 *   name: Todo
 *   description: TODO
 */
api.use("/todo", todoRouter);

/**
 * @swagger
 * tags:
 *   name: Hashtag
 *   description: hashtag
 */
api.use("/hashtag", hashtagRouter);

/**
 * @swagger
 * tags:
 *   name: List
 *   description: list data
 */
api.use("/list", listRouter);

export default api;
