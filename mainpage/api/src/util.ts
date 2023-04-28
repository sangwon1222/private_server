import express from "express";
import * as mysql from "mysql";
import * as jwt from "jsonwebtoken";
import crypto from "crypto-js";

export const checkToken = (token: string) => {
  return jwt.decode(token);
};

export const getCurrentTime = async () => {
  const fullDate = new Date();
  const month = fullDate.getMonth() + 1;
  const date = fullDate.getDate();

  const year = fullDate.getFullYear();
  const formatMonth = `${month}`.length === 1 ? `0${month}` : month;
  const formatDate = `${date}`.length === 1 ? `0${date}` : date;

  const fd = `${year}-${formatMonth}-${formatDate}`;
  const h = fullDate.getHours() + 9;
  const m = fullDate.getMinutes();
  const time = `${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}`;
  return `${fd} ${time}`;
};
/**
 * @description Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
 * @description 발생시 대처 : https://1mini2.tistory.com/88
 */
export const Query = (sqlString: string) => {
  return new Promise<any>((resolve, reject) => {
    const isDevMode = process.env.NODE_ENV == "production";
    const host = isDevMode ? "mainpage-mysql-1" : "api.lsw.kr";
    const port = isDevMode ? 3306 : 3310;

    const connection = mysql.createConnection({
      host,
      port,
      user: "mainpage",
      password: "1234",
      database: "auth",
      multipleStatements: true,
    });

    connection.connect(function (err) {
      console.log("DBConnected!");
      if (err) {
        console.log("error when connecting to db:", err);
      }
    });

    connection.query(
      sqlString,
      function (error: mysql.MysqlError, results, fields) {
        resolve({ error, results, fields });
      }
    );
    connection.end();
  });
};
