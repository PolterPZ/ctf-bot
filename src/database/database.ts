import mongoose from "mongoose";
import { ConfigService } from "../config/config.service";
const url = new ConfigService().get("DATABASE_URL");
const ConnectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("Підключено до бази даних");
  } catch (error) {
    console.error("Помилка підключення до бази даних:", error);
    process.exit(1);
  }
};

export default ConnectDB;
