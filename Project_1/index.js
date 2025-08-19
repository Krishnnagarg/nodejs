import express from "express";
import User from "./models/user.js";
import userRouter from "./routes/user.js";
import { connectMongoDb } from "./connection.js";
import { logReqRes } from "./Middleware/index.js";

const app = express();
const PORT = 8000;

//connection
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.error("Error in MongoDB :", err));

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

//Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server started at localhost:${PORT}`);
});
