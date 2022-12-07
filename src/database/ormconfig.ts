import "dotenv/config";
import { DataSourceOptions } from "typeorm";

const config: DataSourceOptions = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  schema: "sist_Recados",
  ssl: {
    rejectUnauthorized: false,
  },
  entities: ["src/database/entities/*.{ts, js}"],
};
export default config;
