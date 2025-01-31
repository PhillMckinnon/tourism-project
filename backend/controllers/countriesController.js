const Country = require("../models/countryModel");

const getCountries = async (req, res) => {
  try {
    const countries = await Country.findAll();
    res.json(countries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error!" });
  }
};

const getCountryById = async (req, res) => {
  try {
    const countryId = req.params.id;
    const country = await Country.findByPk(countryId);
    if (country) {
      res.json(country);
    } else {
      res.status(404).json({ error: "country not found!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error!" });
  }
};

const createCountry = async (req, res) => {
  try {
    const newCountry = await Country.create(req.body);
    res.status(201).json(newCountry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error!" });
  }
};

const updateCountry = async (req, res) => {
  try {
    const [updated] = await Country.update(req.body, {
      where: { id: req.params.id },
    });

    if (updated) {
      const updatedCountry = await Country.findByPk(req.params.id);
      res.json(updatedCountry);
    } else {
      res.status(404).json({ error: "country not found!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error!" });
  }
};

const deleteCountry = async (req, res) => {
  try {
    const deleted = await Country.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "country not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error!" });
  }
};

module.exports = {
  getCountries,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountry,
};
