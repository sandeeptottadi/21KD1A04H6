const express = require("express");
const app = express();
const controllers = require("./controllers/index");
const cors = require("cors");

app.use(cors());

app.use(controllers);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
