// lib/config/database.ts
import { Sequelize } from "sequelize";
require('dotenv').config()

export const database = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  });
