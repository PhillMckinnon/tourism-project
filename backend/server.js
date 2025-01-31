const express = require('express');
const cors = require('cors');
const app = express();
const countryRoutes = require('./routes/countryRoutes');
const clientRoutes = require('./routes/clientRoutes');
const tourRoutes = require('./routes/tourRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const authRoutes = require('./routes/authRoutes');

const sequelize = require('./config/db');  


require("./models");

// CORS Configuration
app.use(cors({
    origin: ['http://192.168.66.59:3000', "http://localhost:3000", "http://127.0.0.1:3000", "http://192.168.66.230" ],
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
