CREATE TABLE USERS (--ユーザーテーブル
  user_id INT PRIMARY KEY AUTO_INCREMENT, --主キー　ユーザーID
  mailaddress VARCHAR(255) NOT NULL,--メールアドレス
  password VARCHAR(255) NOT NULL,--パスワード
  name VARCHAR(255) NOT NULL,--名前
  phone VARCHAR(20) NOT NULL,--電話番号
  attribute ENUM('employer','employee') NOT NULL DEFAULT 'employee'--ユーザーの属性 （雇用者、被雇用者）デフォルト被雇用者
);

CREATE TABLE COMPANY (--企業テーブル
  company_id INT PRIMARY KEY AUTO_INCREMENT, --主キー　企業のID
  company_name VARCHAR(255) NOT NULL, --企業名
  address VARCHAR(255) NOT NULL,--企業の住所
  phone VARCHAR(20) NOT NULL--企業の電話番号
);

CREATE TABLE EMPLOYER (--雇用者テーブル
  employer_id INT PRIMARY KEY AUTO_INCREMENT,--主キー　雇用者のID
  user_id INT NOT NULL,--外部キ　ーユーザーのID
  company_id INT NOT NULL,--外部キー　企業のID
  FOREIGN KEY (user_id) REFERENCES USERS(user_id),
  FOREIGN KEY (company_id) REFERENCES COMPANY(company_id)
);

CREATE TABLE EMPLOYEE (--被雇用者テーブル
  employee_id INT PRIMARY KEY AUTO_INCREMENT,--主キー　雇用者のID
  user_id INT NOT NULL, --外部キー　ユーザーのID
  priority INT NOT NULL,--シフトの優先度
  min_time INT NOT NULL,--シフトに入れる最小時間
  max_time INT NOT NULL,--シフトに入れる最高時間
  newcomer BOOLEAN NOT NULL DEFAULT FALSE, --新人かどうか
  FOREIGN KEY (user_id) REFERENCES USERS(user_id)
);

CREATE TABLE STORE (--店舗テーブル
  store_id INT PRIMARY KEY AUTO_INCREMENT, --主キー　店舗のID
  company_id INT NOT NULL,--外部キー　企業のID
  store_name VARCHAR(255) NOT NULL,--店舗の名前
  phone VARCHAR(255) NOT NULL,--店舗の電話番号
  address VARCHAR(255) NOT NULL,--店舗の住所
  time_open TIME NOT NULL,--開店時間
  time_close TIME NOT NULL,--閉店時間
  FOREIGN KEY (company_id) REFERENCES COMPANY(company_id)
);

CREATE TABLE SHIFT_RULE (-- シフトルールテーブル
  shiftrule_id INT PRIMARY KEY AUTO_INCREMENT,--主キー　シフトルールのID
  store_id INT NOT NULL,--外部キー　店舗のID
  time_people BOOLEAN NOT NULL DEFAULT FALSE, --時間帯最少人数
  priority BOOLEAN NOT NULL DEFAULT FALSE,--人員の優先度
  min_max_time BOOLEAN NOT NULL DEFAULT FALSE,--被雇用者の最小/最大の時間
  before_shift BOOLEAN NOT NULL DEFAULT FALSE,--前日のシフトの考慮
  FOREIGN KEY (store_id) REFERENCES STORE(store_id)
);

CREATE TABLE SHIFT_DESIRED ( --希望シフトテーブル
  store_desired INT PRIMARY KEY AUTO_INCREMENT,  --主キー　希望シフトのID
  employee_id INT NOT NULL, --外部キー　従業員のID
  store_id INT NOT NULL, --外部キー　店舗のID
  time_start VARCHAR NOT NULL,  --希望シフトの開始時間
  time_finish VARCHAR NOT NULL,  --希望シフトの終了時間
  situation ENUM('hold','approval','rejection','cancel') NOT NULL DEFAULT 'hold',    --状態　（保留、承認、拒否、取り消し）デフォルト保留
  FOREIGN KEY (employee_id) REFERENCES EMPLOYEE(employee_id),
  FOREIGN KEY (store_id) REFERENCES STORE(store_id)
);

CREATE TABLE SHIFT (-- シフトテーブル
  shift_id INT PRIMARY KEY AUTO_INCREMENT,--シフトのID
  store_id INT NOT NULL,--店舗のID
  shiftrule_id INT NOT NULL,--シフトルールのID
  time_start TIME NOT NULL,--開始時間
  time_finish TIME NOT NULL,--終了時間
  created_by INT NOT NULL, --シフト作成者
  FOREIGN KEY (store_id) REFERENCES STORE(store_id),
  FOREIGN KEY (shiftrule_id) REFERENCES SHIFT_RULE(shiftrule_id),
  FOREIGN KEY (created_by) REFERENCES EMPLOYER(employer_id)
);

CREATE TABLE SHIFT_ASSIGN (-- シフト割当テーブル
  shift_assign_id INT PRIMARY KEY AUTO_INCREMENT,--主キー　シフト割当のID
  shift_id INT NOT NULL,--外部キー　シフトのID
  employee_id INT NOT NULL,--外部キー　被雇用者のID
  shift_times DATETIME NOT NULL,--割り当てられたシフトの日時
  state ENUM('pending','confirmed','cancel') NOT NULL DEFAULT 'pending',--状態　（未確定、確定、取り消し）デフォルト未確定
  FOREIGN KEY (shift_id) REFERENCES SHIFT(shift_id),
  FOREIGN KEY (employee_id) REFERENCES EMPLOYEE(employee_id)
);

CREATE TABLE TIME_PEOPLE (-- 時間帯ごとの最小/最大人数テーブル
  time_people_id INT PRIMARY KEY AUTO_INCREMENT,--主キー　時間帯人数ID
  store_id INT NOT NULL,--外部キー　店舗のID
  pattern VARCHAR(255) NOT NULL, -- 平日、休日など
  min_people INT NOT NULL,--シフトに入れる最小人数
  max_people INT NOT NULL,--シフトに入れる最大人数
  newcomer INT NOT NULL,-- 新人上限数
  FOREIGN KEY (store_id) REFERENCES STORE(store_id)
);

CREATE TABLE NOTICE (-- 通知テーブル
  notice_id INT PRIMARY KEY AUTO_INCREMENT,--主キー　通知のID
  user_id INT NOT NULL,--外部キー　ユーザーのID
  kinds VARCHAR(255) NOT NULL,--通知の種類
  notice VARCHAR(255) NOT NULL,--通知の内容
  FOREIGN KEY (user_id) REFERENCES USERS(user_id)
);

CREATE TABLE CHAT_MESSAGE (-- チャットメッセージテーブル
  chat_id INT PRIMARY KEY AUTO_INCREMENT,--主キー　チャットメッセージのID
  sender_id INT NOT NULL,--外部キー　送信者ID
  receiver_id INT NOT NULL,--外部キー　受信者のID
  content VARCHAR(255) NOT NULL,--チャットメッセージの内容
  FOREIGN KEY (sender_id) REFERENCES USERS(user_id), 
  FOREIGN KEY (receiver_id) REFERENCES USERS(user_id) 
);