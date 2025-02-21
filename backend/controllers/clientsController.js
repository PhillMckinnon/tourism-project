const bcrypt = require("bcrypt"); 
const Client = require("../models/clientModel");

const getClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.json(clients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error!" });
  }
};

const getClientById = async (req, res) => {
  try {
    const clientId = req.params.id;
    const client = await Client.findByPk(clientId);

    if (client) {
      res.json(client);
    } else {
      res.status(404).json({ error: "client not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error!" });
  }
};

const createClient = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, password, is_admin } = req.body;
    const email_Lower = email.toLowerCase();

    
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ error: "First name, last name, email, and password are required!" });
    }


    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(password, salt); 

    
    const newClient = await Client.create({
      first_name,
      last_name,
      email: email_Lower,
      phone,
      password_hash: hashedPassword, 
      is_admin: is_admin || false, 
    });

    res.status(201).json(newClient); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error!" });
  }
};

const updateClient = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, password, is_admin } = req.body;
    const clientId = req.params.id;
    const email_Lower = email.toLowerCase();


    const client = await Client.findByPk(clientId);
    if (!client) {
      return res.status(404).json({ error: "client not found!" });
    }

    let updatedFields = { first_name, last_name, email: email_Lower, phone, is_admin };


    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updatedFields.password_hash = hashedPassword;
    }
    await Client.update(updatedFields, {
      where: { id: clientId },
    });
    const updatedClient = await Client.findByPk(clientId);
    res.json(updatedClient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error!" });
  }
};

const deleteClient = async (req, res) => {
  try {
    const deleted = await Client.destroy({
      where: { id: req.params.id },
    });

    if (deleted) {
      res.status(204).send(); 
    } else {
      res.status(404).json({ error: "client not found!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error!" });
  }
};

module.exports = { getClients, getClientById, createClient, updateClient, deleteClient };
