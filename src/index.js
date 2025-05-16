const express = require("express");
const app = express();
const port = 3001;

app.get("/", (req, res) => {
  console.log(req);
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`App listening on port number: ${port}`);
});
