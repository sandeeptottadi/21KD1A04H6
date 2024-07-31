const express = require("express");
const router = express.Router();
require("dotenv").config();

const middleware = require("../middleware/index");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const axios = require("axios");

router.post("/get_products", middleware, async (req, res) => {
  const companyName = req.body.companyName;
  const category = req.body.category;
  const minPrice = parseInt(req.body.minPrice);
  const maxPrice = parseInt(req.body.maxPrice);
  const productsPerPage = parseInt(req.body.n);
  //   const isAvailable = req.body.isAvailable;
  //   const discount = req.body.discount;
  //   const rating = req.body.rating;

  const url = `http://20.244.56.144/test/companies/${companyName}/categories/${category}/products?top=${productsPerPage}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.access_token}`,
      },
    });
    const { v4: uuidv4 } = require("uuid");

    if (Array.isArray(response.data)) {
      response.data = response.data.map((item) => ({
        ...item,
        id: uuidv4(),
      }));
    } else if (typeof response.data === "object" && response.data !== null) {
      response.data.id = uuidv4();
    }

    res.status(200).send(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error: ${error}`);
  }
});

module.exports = router;
