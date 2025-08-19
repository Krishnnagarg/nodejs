import express from "express";
// import { mongoose, User } from "./models/user.js";
import userRouter from "./routes/user.js";
import { connectMongoDb } from "./connection.js";
import  { logReqRes} from "./Middleware/index.js";

const app = express();

//connection
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1");

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

//Routes
const PORT = 8000;
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server started at localhost:${PORT}`);
});
