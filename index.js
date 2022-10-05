// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:timestamp", function (req, res) {  
  // get the date string 
  let timestamp = req.params.timestamp;
  if ((/\d{4}-\d{2}-\d{2}/).test(timestamp)) { 
      let d = new Date(timestamp).toUTCString()
      res.json({"utc":d})
  } else if ((/^\d+$/).test(timestamp)) { 
    let unix = parseInt(timestamp);
    let utc =  new Date(unix).toUTCString()
    res.json({ 'unix': unix, utc: utc })
    
  } 
});





// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
