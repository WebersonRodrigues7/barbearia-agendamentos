import { DataSource } from "typeorm";


export default new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "buss123",
    database: "barber",
    entities: ["src/**/*.entity.ts"],
    migrations: ["src/migrations/*.ts"],
    synchronize: false,
});