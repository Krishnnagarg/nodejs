import express from "express";
import fs from "fs";
import mongoose from "mongoose";

const app = express();
//connection
mongoose
  .connect("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error", err));

//schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//model
const User = mongoose.model("user", userSchema);

//Middleware
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("Hello from middleware 1");
  next();
});

app.use((req, res, next) => {
  console.log("Hello from middleware 2");
  next();
});

app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({}); //{} means all users in database
  const html = `
    <ul>
    ${allDbUsers
      .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
      .join("")}
    </ul>
    `;
  res.send(html); //Ye HTML string ko response ke roop me browser me bhej deta hai.
});

//Rest API

app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "This Id doesn't Exist" });
    return res.status(200).json(user);
  })
  .patch(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, {
      firstName: "Yash",
    });
    return res.status(200).json({ msg: "Successfully Updated" });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    return res.json({ status: "Success" });
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.job_title ||
    !body.gender
  ) {
    return res.status(400).json({ mag: "All body required...." });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    jobTitle: body.job_title,
    gender: body.gender,
  });

  return res.status(201).json({ msg: "success" });
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server started at localhost:${PORT}`);
});
