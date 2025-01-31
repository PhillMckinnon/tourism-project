const bcrypt = require('bcrypt');
const clientModel = require('../models/clientModel');

const login = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    const email_Lower = email.toLowerCase();
    try {
        const user = await clientModel.findOne({ where: { email: email_Lower } });
        if (!user) {
            return res.status(401).json({ message: 'user not found!' });
        }
        const isPassValid = await bcrypt.compare(password, user.password_hash);
        if (!isPassValid) {
            return res.status(401).json({ message: "invalid password!" });
        }
        res.json({ is_admin: user.is_admin });
    } catch (error) {
        console.error('error in login:', error);
        res.status(500).json({ message: 'server error!', error });
    }
};

const register = async (req, res) => {
    const { firstName, lastName, email, phone, password } = req.body;
    const email_Lower = email.toLowerCase();
    try {
        const existingClient = await clientModel.findOne({ where: { email: email_Lower } });
        if (existingClient) {
            return res.status(400).json({ message: 'email already exists!' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newClient = await clientModel.create({
            first_name: firstName,
            last_name: lastName,
            email: email_Lower,
            phone,
            password_hash: hashedPassword,
            is_admin: false, 
        });
        res.status(201).json({ message: 'User created successfully', is_admin: newClient.is_admin });
    } catch (error) {
        console.error('Error in register:', error);
        res.status(500).json({ message: 'server error!', error });
    }
};

module.exports = { login, register };
