const { sequelize} = require('./models');
const equipmentRoutes = require('./routes/Equipment');
const personRoutes = require('./routes/persons')
const deviceRoutes = require('./routes/device');
const placesRoutes = require('./routes/places');
const technicalWarehouseRoutes = require('./routes/Technicalwarehouse')
const deployedEquipmentRoutes = require('./routes/DeployedEquipment');


const cors = require("cors");

const express = require('express');
const bodyParser = require('body-parser');
// sequelize.sync({alter:true})
const app = express();
const PORT = 3000;
app.use(cors());
// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies


// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies

// API routes
app.use('/equipment', equipmentRoutes);
app.use('/persons', personRoutes);
app.use('/device', deviceRoutes);
app.use('/places', placesRoutes); // Mount /places routes
app.use('/technicalWarehouse', technicalWarehouseRoutes);
app.use('/deployedEquipment', deployedEquipmentRoutes);




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });