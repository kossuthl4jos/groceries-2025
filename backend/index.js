const express = require("express");

const port = process.env.SERVER_PORT;
const app = express();

app.use(express.json());

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

//routes
app.get("/books", (req, res) => {
  res.json({ message: "Welcome to the Books API!" });
});
