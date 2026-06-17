CREATE TABLE users (
  id VARCHAR2(64) PRIMARY KEY,
  name VARCHAR2(120) NOT NULL,
  email VARCHAR2(320) NOT NULL UNIQUE,
  password_hash VARCHAR2(255) NOT NULL,
  points NUMBER(10) DEFAULT 0 NOT NULL,
  waste_classified NUMBER(10) DEFAULT 0 NOT NULL,
  pickups_completed NUMBER(10) DEFAULT 0 NOT NULL,
  co2_saved_kg NUMBER(10,2) DEFAULT 0 NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE classifications (
  id VARCHAR2(64) PRIMARY KEY,
  user_id VARCHAR2(64) NOT NULL,
  type VARCHAR2(60) NOT NULL,
  confidence NUMBER(5,2) NOT NULL,
  original_name VARCHAR2(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  CONSTRAINT fk_classifications_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE pickups (
  id VARCHAR2(64) PRIMARY KEY,
  user_id VARCHAR2(64) NOT NULL,
  pickup_date VARCHAR2(20) NOT NULL,
  pickup_time VARCHAR2(20) NOT NULL,
  type VARCHAR2(60) NOT NULL,
  address VARCHAR2(500) NOT NULL,
  status VARCHAR2(30) DEFAULT 'scheduled' NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  CONSTRAINT fk_pickups_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE reward_catalog (
  id VARCHAR2(64) PRIMARY KEY,
  name VARCHAR2(120) NOT NULL,
  cost NUMBER(10) NOT NULL,
  icon VARCHAR2(30) NOT NULL,
  display_order NUMBER(10) NOT NULL
);

CREATE TABLE reward_history (
  id VARCHAR2(64) PRIMARY KEY,
  user_id VARCHAR2(64) NOT NULL,
  action VARCHAR2(255) NOT NULL,
  points NUMBER(10) NOT NULL,
  event_date DATE DEFAULT TRUNC(SYSDATE) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  CONSTRAINT fk_reward_history_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_classifications_user_created ON classifications (user_id, created_at DESC);
CREATE INDEX idx_pickups_user_created ON pickups (user_id, created_at DESC);
CREATE INDEX idx_reward_history_user_created ON reward_history (user_id, created_at DESC);

CREATE OR REPLACE TRIGGER users_bir
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
  IF :NEW.id IS NULL THEN
    :NEW.id := 'user_' || RAWTOHEX(SYS_GUID());
  END IF;
END;
/

CREATE OR REPLACE TRIGGER classifications_bir
BEFORE INSERT ON classifications
FOR EACH ROW
BEGIN
  IF :NEW.id IS NULL THEN
    :NEW.id := 'cls_' || RAWTOHEX(SYS_GUID());
  END IF;
END;
/

CREATE OR REPLACE TRIGGER pickups_bir
BEFORE INSERT ON pickups
FOR EACH ROW
BEGIN
  IF :NEW.id IS NULL THEN
    :NEW.id := 'pickup_' || RAWTOHEX(SYS_GUID());
  END IF;
END;
/

CREATE OR REPLACE TRIGGER reward_history_bir
BEFORE INSERT ON reward_history
FOR EACH ROW
BEGIN
  IF :NEW.id IS NULL THEN
    :NEW.id := 'reward_' || RAWTOHEX(SYS_GUID());
  END IF;
END;
/
