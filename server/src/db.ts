import { DataSource } from "typeorm";
import User from "./entity/User";
import Group from "./entity/Group";
import EcoAction from "./entity/EcoAction";
import { env } from "./env";
import Comment from "./entity/Comment";
import { Team } from "./entity/Team";

const datasource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  synchronize: true,
  entities: [User, Group, EcoAction, Comment, Team],
});

export default datasource;
