import mysql from "mysql2/promise";

const config = useRuntimeConfig();

export const pool = mysql.createPool({
  host: config.databaseHost,
  user: config.databaseUser,
  password: config.databasePassword,
  database: config.databaseName,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
