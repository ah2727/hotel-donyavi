const { sequelize} = require('./models');
const equipmentRoutes = require('./routes/Equipment');
const personRoutes = require('./routes/persons')
const deviceRoutes = require('./routes/device');

const express = require('express');
const bodyParser = require('body-parser');
sequelize.sync({alter:true})
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies


// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies

// API routes
app.use('/equipment', equipmentRoutes);
app.use('/persons', personRoutes);
app.use('/device', deviceRoutes);




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });