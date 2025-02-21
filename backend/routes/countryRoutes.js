const express = require("express");
const router = express.Router();
const {
  getCountries,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountry,
} = require("../controllers/countriesController");
router.get("/countries", getCountries);
router.get("/countries:id", getCountryById);
router.post("/countries_create", createCountry);
router.put("/countries_put:id", updateCountry);
router.delete("/countries_del:id", deleteCountry);
module.exports = router;
