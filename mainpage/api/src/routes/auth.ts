import * as express from "express";
import AuthController from "../controller/auth";

const authRouter: express.Router = express.Router();

/**
 * @swagger
 * paths:
 *  /api/auth/sign-in:
 *    post:
 *      summary: "로그인"
 *      description: "회원 로그인"
 *      tags: [Auth]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *                properties:
 *                    id:
 *                      type: string
 *                      description: "사용자 id"
 *                      example: "lsw"
 *                    pw:
 *                      type: string
 *                      description: "사용자 패스워드"
 *                      example: "1234"
 *      responses:
 *        "200":
 *          description: 로그인 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    ok:
 *                      type: boolean
 *                    code:
 *                      type: interger
 *                    message:
 *                      type: string
 *                    result:
 *                      type: object
 *                      example:
 *                          [
 *                            { "username": '', "accessToken": "", refreshToken: '', account:'' },
 *                          ]
 */
authRouter.post("/sign-in", AuthController.signIn);

authRouter.post("/sign-up", AuthController.signUp);

authRouter.post("/sign-out", AuthController.signOut);

authRouter.post("/get-user", AuthController.getUser);

// authRouter.post("/sign-in/accessTokenCheck", AuthController.accessTokenCheck);

export default authRouter;
