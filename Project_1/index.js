import express from "express";
import fs from "fs";
import users from "./MOCK_DATA.json" assert { type: "json" };

const app = express();
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

app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html); //Ye HTML string ko response ke roop me browser me bhej deta hai.
});

//Rest API

app.get("/api/users", (req, res) => {
  res.setHeader("X-myName","KrishnaGarg");//custom header
  //Always add x to custom header 
  return res.json(users);  //res.json json is used because we work with json
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id); //firstly id get
    const user = users.find((user) => user.id === id);
    if(!user) return res.status(404).json({error:"user not found"})
    return res.json(user);
  })
  .patch((req, res) => {
    // kisi existing user ki details update karna.
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const newUsers = users.filter((user) => user.id !== id); // us id wale user ko hata diya

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(newUsers), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ status: "Error", message: "File write failed" });
      }
      return res.json({
        status: "Success",
        message: `User with id ${id} deleted`,
      });
    });
  });

app.post("/api/users", (req, res) => {
  //create new user data
  const body = req.body;
  if(!body || !body.first_name || !body.last_name || !body.email || !body.job_title || !body.gender) {
    return res.status(400).json({mag:"All body req...."})
  } 
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ msg: "Success", id: users.length });
  });
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server started at localhost:${PORT}`);
});
