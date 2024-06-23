import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    let db = DB_NAME;
    if (process.env.TEST) {
      db = "tests";
    }
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}${db}`
    );
    console.log(
      `\n MongoDB connected DB HOST : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("monogodb connection failed", error);
    process.exit(1);
  }
};
export default connectDB;