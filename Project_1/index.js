import express from "express";
import users from "./MOCK_DATA.json" assert { type: "json" };

const app = express();

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
  return res.json(users); //res.json json is used because we work with json
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id); //firstly id get
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    //edit the user with id
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    //delete the user with id
    return res.json({ status: "pending" });
  });

app.post("/api/users", (req, res) => {
  //create new user
  return res.json({ status: "pending" });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server started at localhost:${PORT}`);
});
