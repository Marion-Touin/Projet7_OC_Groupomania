const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path =  require('path');
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");

db.sequelize.sync();

app.use('/images', express.static(path.join(__dirname, 'images')));

require("./routes/article")(app); 
require("./routes/commentaire")(app); 
require("./routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port: ${PORT}.`);
});