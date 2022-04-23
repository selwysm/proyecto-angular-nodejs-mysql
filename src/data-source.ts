import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  name: "deafult",
  type: "mysql",
  host: "0.0.0.0",
  port: 3306,
  username: "root",
  password: "26841397",
  database: "selwys",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
