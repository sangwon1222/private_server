CREATE DATABASE IF NOT EXISTS todo;
USE todo;

-- auth
CREATE TABLE auth (
  idx int UNSIGNED NOT NULL AUTO_INCREMENT,
  userId varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  password varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  userName varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  teamId int
  ,PRIMARY KEY (idx)
  ,INDEX( teamId )
  ,INDEX( userId )

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- teamTodo
CREATE TABLE teamTodo (
  idx int UNSIGNED NOT NULL AUTO_INCREMENT,
  teamId int NOT NULL,
  contents varchar(9999) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  createDate varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  creatorId int NOT NULL,
  creatorName varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  creatorTeamId int NOT NULL,
  updaterId varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  updateDate varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  updaterName varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  updaterTeamId int NOT NULL,
  startDate varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  endDate varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  tag json DEFAULT NULL,
  status int DEFAULT '0',
  PRIMARY KEY (idx)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO auth (userId, password, userName, teamId) VALUES
('kwonth1210', '1234', '권태현', 1),
('swlee', '1234', '이상원', 1)

-- user추가
ALTER USER 'todo'@'%' IDENTIFIED WITH mysql_native_password BY '1234';
GRANT USAGE ON *.* TO 'todo'@'%';
-- GRANT EXECUTE, SELECT, SHOW VIEW, ALTER, ALTER ROUTINE, CREATE, CREATE ROUTINE, CREATE TEMPORARY TABLES, CREATE VIEW, DELETE, DROP, EVENT, INDEX, INSERT, REFERENCES, TRIGGER, UPDATE, LOCK TABLES  ON 'todo'.* TO 'todo'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
