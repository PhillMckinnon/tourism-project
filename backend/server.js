const express = require('express');
const cors = require('cors');
const app = express();
const countryRoutes = require('./routes/countryRoutes');
const clientRoutes = require('./routes/clientRoutes');
const tourRoutes = require('./routes/tourRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
const sequelize = require('./config/db');  

const allowed_origins = process.env.CORS_URLS.split(',');
require("./models");

app.use(cors({
    origin: allowed_origins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use('/api', countryRoutes);
app.use('/api', clientRoutes);
app.use('/api', tourRoutes);
app.use('/api', bookingRoutes);
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000;

(async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected successfully.');

        await sequelize.sync({ alter: false }); 
        console.log('✅ Database synced.');

        app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    }
})();
