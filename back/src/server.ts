import app from "./App";
import dotevn from "dotenv";
import mongoose from "mongoose";

dotevn.config();
const port = 5000;

mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => app.listen(port, () => console.log("server is up")))
  .catch(() => {
    console.log("server is down"), process.exit(1);
  });