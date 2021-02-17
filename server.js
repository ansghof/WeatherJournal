// Setup empty JS object to act as endpoint for all routes
projectData = {};

// imports
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// spin up server
const port = 3000;
const server = app.listen(port, listening);
function listening() {
  console.log(`running on localhost: http://localhost:${port}`);
}

//#region ROUTES
app.get("/projectData", getProjectData);

function getProjectData(request, response) {
  response.status = 200;
  response.send(projectData);
}

app.post("/projectData", postProjectData);

function postProjectData(request, response) {
  response.status = 201;
  data = request.body;
  projectData["temp"] = data.temp;
  projectData["feel"] = data.feel;
  projectData["date"] = data.date;
  response.send(projectData);
}
//#endregion
