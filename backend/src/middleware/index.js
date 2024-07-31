const middleware = (req, res, next) => {
  // get access token
  const axios = require("axios");
  const url = "http://20.244.56.144/test/auth";
  const data = {
    companyName: process.env.companyName,
    ownerName: process.env.ownerName,
    ownerEmail: process.env.ownerEmail,
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    rollNo: process.env.rollNo,
  };
  axios
    .post(url, data)
    .then((response) => {
      req.access_token = response.data.access_token;
      next();
    })
    .catch((error) => {
      console.error("Error fetching access token:", error);
      res.status(500).send("Internal Server Error");
    });
};
module.exports = middleware;
