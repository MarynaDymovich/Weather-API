// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
// Configure express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, listening);
function listening(){
  console.log('Running on localhost '+port);
};

// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// GET route
app.get('/aa', function (req, res) {
  console.log("app.get");
  //new line:
  const weatherData2 = JSON.stringify(projectData);
  res.send(weatherData2); 
  console.log("From inside app.get:");
  console.log(weatherData2);
});

// POST route
app.post('/', function (req, res){
  //console.log("app.post");
  //console.log(projectData);

console.log(req.body);
projectData.temp=req.body.temp;
projectData.date=req.body.date;
projectData.feelings=req.body.feelings;
res.send(projectData)({
  msg:'Received your post:)'
});
  });
