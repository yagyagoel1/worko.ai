import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./../.env",
});
connectDB()
  .then(() => {
    try {
      app.on("error", (error) => {
        throw error;
      });
      if (process.env.TEST) {
        app.listen(process.env.PORT, () => {
          console.log(`listening on port ${process.env.PORT}`);
        });
      }
    } catch (error) {
      console.error("error while listening ", error);
    }
  })
  .catch((error) => {
    console.error("error while connecting to db ", error);
  });