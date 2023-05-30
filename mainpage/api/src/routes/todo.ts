import * as express from "express";
import TodoController from "../controller/todo";

export const todoRouter: express.Router = express.Router();

todoRouter.post("/get-list", TodoController.getList);

