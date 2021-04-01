CREATE DATABASE selectiveprocessdb;

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "cpf" text NOT NULL,
  "birth_date" text NOT NULL,
  "cep" text NOT NULL,
  "address" text NOT NULL,
  "address_number" text NOT NULL,
  "address_complement" text,
  "address_district" text NOT NULL,
  "course_id" int NOT NULL,
  "college_id" int NOT NULL,
  "period_course" text NOT NULL,
  "specialization" text NOT NULL,
  "email" text NOT NULL,
  "phone1" text NOT NULL,
  "phone2" text,
  "password" text NOT NULL,
  "reset_token" text,
  "reset_token_expires" text,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "user_admin" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "email" text NOT NULL,
  "password" text NOT NULL,
  "reset_token" text,
  "reset_token_expires" text,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "courses" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL
);

CREATE TABLE "colleges" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL
);

ALTER TABLE "users" ADD FOREIGN KEY ("course_id") REFERENCES "courses" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("college_id") REFERENCES "colleges" ("id");


--create procedure
CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN 
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- auto updated_at users
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();


-- connect pg simple table
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

-- -- TO RUN SEEDS
-- DELETE FROM products;
-- DELETE FROM users;
-- DELETE FROM files;

-- -- RESTAR SEQUENCE AUTO_INCREMENT FROM TABLES IDS
-- ALTER SEQUENCE products_id_seq RESTART WITH 1;
-- ALTER SEQUENCE users_id_seq RESTART WITH 1;
-- ALTER SEQUENCE files_id_seq RESTART WITH 1;