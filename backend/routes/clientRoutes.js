const express = require("express");
const router = express.Router();
const {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} = require("../controllers/clientsController");

router.post("/clients_create", createClient);
router.put("/clients_put:id", updateClient);
router.delete("/clients_del:id", deleteClient);
router.get("/clients", getClients);
router.get("/clients:id", getClientById);

module.exports = router;
