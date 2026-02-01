/* ユーザーテーブル */
CREATE TABLE USERS (
  user_id INT PRIMARY KEY AUTO_INCREMENT, /* 主キー　ユーザーID */
  mailaddress VARCHAR(255) NOT NULL, /* メールアドレス */
  password VARCHAR(255) NOT NULL, /* パスワード */
  name VARCHAR(255) NOT NULL, /* 名前 */
  phone VARCHAR(20) NOT NULL, /* 電話番号 */
  attribute ENUM('employer','employee') NOT NULL DEFAULT 'employee'/* ユーザーの属性 （雇用者、被雇用者）デフォルト被雇用者 */
);
/* 企業テーブル */
CREATE TABLE COMPANY (
  company_id INT PRIMARY KEY AUTO_INCREMENT, /* 主キー　企業のID */
  company_name VARCHAR(255) NOT NULL,   /* 企業名 */
  address VARCHAR(255) NOT NULL,   /* 企業の住所 */
  phone VARCHAR(20) NOT NULL   /* 企業の電話番号 */
);
/* 雇用者テーブル */
CREATE TABLE EMPLOYER (
  employer_id INT PRIMARY KEY AUTO_INCREMENT,/* 主キー　雇用者のID */
  user_id INT NOT NULL,/* 外部キ　ーユーザーのID */
  company_id INT NOT NULL,/* 外部キー　企業のID */
  FOREIGN KEY (user_id) REFERENCES USERS(user_id),
  FOREIGN KEY (company_id) REFERENCES COMPANY(company_id)
);
/* 被雇用者テーブル */
CREATE TABLE EMPLOYEE (
  employee_id INT PRIMARY KEY AUTO_INCREMENT,/* 主キー　雇用者のID */
  user_id INT NOT NULL, /* 外部キー　ユーザーのID */
  priority INT NOT NULL,/* シフトの優先度 */
  min_time INT NOT NULL,/* シフトに入れる最小時間 */
  max_time INT NOT NULL,/* シフトに入れる最高時間 */
  newcomer BOOLEAN NOT NULL DEFAULT FALSE, /* 新人かどうか */
  FOREIGN KEY (user_id) REFERENCES USERS(user_id)
);
/* 店舗テーブル */
CREATE TABLE STORE (
  store_id INT PRIMARY KEY AUTO_INCREMENT, /* 主キー　店舗のID */
  company_id INT NOT NULL,/* 外部キー　企業のID */
  store_name VARCHAR(255) NOT NULL,/* 店舗の名前 */
  phone VARCHAR(255) NOT NULL,/* 店舗の電話番号 */
  address VARCHAR(255) NOT NULL,/* 店舗の住所 */
  time_open TIME NOT NULL,/* 開店時間 */
  time_close TIME NOT NULL,/* 閉店時間 */
  FOREIGN KEY (company_id) REFERENCES COMPANY(company_id)
);
/* シフトルールテーブル */
CREATE TABLE SHIFT_RULE (
  shiftrule_id INT PRIMARY KEY AUTO_INCREMENT,/* 主キー　シフトルールのID */
  store_id INT NOT NULL,/* 外部キー　店舗のID */
  time_people BOOLEAN NOT NULL DEFAULT FALSE, /* 時間帯最少人数 */
  priority BOOLEAN NOT NULL DEFAULT FALSE,/* 人員の優先度 */
  min_max_time BOOLEAN NOT NULL DEFAULT FALSE,/* 被雇用者の最小/最大の時間 */
  before_shift BOOLEAN NOT NULL DEFAULT FALSE,/* 前日のシフトの考慮 */
  FOREIGN KEY (store_id) REFERENCES STORE(store_id)
);
/* 希望シフトテーブル */
CREATE TABLE SHIFT_DESIRED (
  store_desired INT PRIMARY KEY AUTO_INCREMENT, /* 主キー　希望シフトのID */
  employee_id INT NOT NULL, /* 外部キー　従業員のID */
  store_id INT NOT NULL, /* 外部キー　店舗のID */
  time_start DATETIME NOT NULL, /* 希望シフトの開始時間 */
  time_finish DATETIME NOT NULL, /* 希望シフトの終了時間 */
  situation ENUM('hold','approval','rejection','cancel') NOT NULL DEFAULT 'hold', /* 状態　（保留、承認、拒否、取り消し）デフォルト保留 */
  FOREIGN KEY (employee_id) REFERENCES EMPLOYEE(employee_id),
  FOREIGN KEY (store_id) REFERENCES STORE(store_id)
);
/* シフトテーブル */
CREATE TABLE SHIFT (
  shift_id INT PRIMARY KEY AUTO_INCREMENT,/* シフトのID */
  store_id INT NOT NULL,/* 店舗のID */
  shiftrule_id INT NOT NULL,/* シフトルールのID */
  time_start DATETIME NOT NULL,/* 開始時間 */
  time_finish DATETIME NOT NULL,/* 終了時間 */
  created_by INT NOT NULL, /* シフト作成者 */
  FOREIGN KEY (store_id) REFERENCES STORE(store_id),
  FOREIGN KEY (shiftrule_id) REFERENCES SHIFT_RULE(shiftrule_id),
  FOREIGN KEY (created_by) REFERENCES EMPLOYER(employer_id)
);
/* シフト割当テーブル */
CREATE TABLE SHIFT_ASSIGN (
  shift_assign_id INT PRIMARY KEY AUTO_INCREMENT,/* 主キー　シフト割当のID */
  shift_id INT NOT NULL,/* 外部キー　シフトのID */
  employee_id INT NOT NULL,/* 外部キー　被雇用者のID */
  shift_times DATETIME NOT NULL,/* 割り当てられたシフトの日時 */
  state ENUM('pending','confirmed','cancel') NOT NULL DEFAULT 'pending',/* 状態　（未確定、確定、取り消し）デフォルト未確定 */
  FOREIGN KEY (shift_id) REFERENCES SHIFT(shift_id),
  FOREIGN KEY (employee_id) REFERENCES EMPLOYEE(employee_id)
);
/* 時間帯ごとの最小/最大人数テーブル */
CREATE TABLE TIME_PEOPLE (
  time_people_id INT PRIMARY KEY AUTO_INCREMENT,/* 主キー　時間帯人数ID */
  store_id INT NOT NULL,/* 外部キー　店舗のID */
  pattern VARCHAR(255) NOT NULL, /* 平日、休日など */
  min_people INT NOT NULL,/* シフトに入れる最小人数 */
  max_people INT NOT NULL,/* シフトに入れる最大人数 */
  newcomer INT NOT NULL,/* 新人上限数 */
  FOREIGN KEY (store_id) REFERENCES STORE(store_id)
);
/* 通知テーブル */
CREATE TABLE NOTICE (
  notice_id INT PRIMARY KEY AUTO_INCREMENT,/* 主キー　通知のID */
  user_id INT NOT NULL,/* 外部キー　ユーザーのID */
  kinds VARCHAR(255) NOT NULL,/* 通知の種類 */
  notice VARCHAR(255) NOT NULL,/* 通知の内容 */
  FOREIGN KEY (user_id) REFERENCES USERS(user_id)
);
/* チャットメッセージテーブル */
CREATE TABLE CHAT_MESSAGE (
  chat_id INT PRIMARY KEY AUTO_INCREMENT,/* 主キー　チャットメッセージのID */
  sender_id INT NOT NULL,/* 外部キー　送信者ID */
  receiver_id INT NOT NULL,/* 外部キー　受信者のID */
  content VARCHAR(255) NOT NULL,/* チャットメッセージの内容 */
  FOREIGN KEY (sender_id) REFERENCES USERS(user_id),
  FOREIGN KEY (receiver_id) REFERENCES USERS(user_id)
);

/* USERSテーブルに住所と企業名を追加 */
ALTER TABLE USERS ADD COLUMN address VARCHAR(255);
ALTER TABLE USERS ADD COLUMN company VARCHAR(255);

/* 1) EMPLOYEE に store_id カラム追加（まずはNULL許可） */
ALTER TABLE EMPLOYEE
  ADD COLUMN store_id INT NULL;

/* 2) 既存データに store_id を入れる（例：従業員1は店舗1） */
UPDATE EMPLOYEE SET store_id = 1 WHERE employee_id = 1;

/* 必要に応じて他の従業員も更新
UPDATE EMPLOYEE SET store_id = 2 WHERE employee_id = 2;
*/

/* 3) 不整合チェック（store_id が存在しない店舗を指してないか） */
SELECT e.employee_id, e.store_id
FROM EMPLOYEE e
LEFT JOIN STORE s ON s.store_id = e.store_id
WHERE e.store_id IS NOT NULL AND s.store_id IS NULL;

/* 4) 外部キー制約を追加（削除時の挙動は好みで選ぶ） */
ALTER TABLE EMPLOYEE
  ADD CONSTRAINT fk_employee_store
  FOREIGN KEY (store_id) REFERENCES STORE(store_id)
  ON UPDATE CASCADE
  ON DELETE RESTRICT;

/* 5) 「必ず所属店舗が必要」なら NOT NULL にする（全員にstore_id入れた後で！） */
-- ALTER TABLE EMPLOYEE
--   MODIFY store_id INT NOT NULL;

ALTER TABLE SHIFT_DESIRED
  ADD COLUMN shift_id BIGINT NULL;

-- 1つの希望が複数の確定シフトを持たないようにするなら
ALTER TABLE SHIFT_DESIRED
  ADD UNIQUE (shift_id);

INSERT INTO USERS (mailaddress, password, name, phone, attribute, address, company)
VALUES
('owner@test.com', 'password', 'テスト雇用者', '090-0000-0000', 'employer', '高知市', 'テスト店舗');

INSERT INTO COMPANY (company_name, address, phone)
VALUES ('テスト企業', '高知市', '088-000-0000');


INSERT INTO STORE (company_id, store_name, phone, address, time_open, time_close)
VALUES (1, 'テスト店舗', '088-000-0000', '高知市', '09:00:00', '21:00:00');

INSERT INTO USERS (mailaddress, password, name, phone, attribute, address)
VALUES
('emp1@test.com', 'password', 'テスト従業員A', '090-1111-1111', 'employee', '高知市'),
('emp2@test.com', 'password', 'テスト従業員B', '090-2222-2222', 'employee', '高知市'),
('emp3@test.com', 'password', 'テスト従業員C', '090-3333-3333', 'employee', '高知市');

INSERT INTO EMPLOYEE (user_id, store_id, priority, min_time, max_time, newcomer)
VALUES
(2, 1, 1, 3, 8, false),
(3, 1, 2, 4, 8, true),
(4, 1, 3, 2, 6, true);

INSERT INTO SHIFT_RULE (store_id, time_people, priority, min_max_time, before_shift)
VALUES (1, false, false, false, false);

INSERT INTO EMPLOYER (user_id, company_id)
VALUES (1, 1);
