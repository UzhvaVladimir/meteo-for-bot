import * as process from "process";

export default () => ({
  port: process.env.PORT,
  db_port: process.env.PG_PORT,
  db_name: process.env.PG_DATABASE,
  db_user: process.env.PG_USERNAME,
  db_password: process.env.PG_PASSWORD,
  db_host: process.env.PG_HOST
})