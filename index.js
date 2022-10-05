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

app.get("/api/:date", function (req, res) {  
  let date = new Date(req.params.date)
  if(req.params.date !==""){
    if(date.toString() === 'Invalid Date'){
      let n = new Number(req.params.date)
      if(!Number.isNaN(req.params.date)){
        let utc = new Date(n).toISOString();    
        res.json({"utc":utc})    
      }else{
        res.json({ error : "Invalid Date" })   
      }
    }else{//valid date return unix      
        let unix = Math.floor(parseInt(req.params.date)/ 1000)
        res.json({"unix":unix})          
    }
}else{  
  let unix = Math.floor(parseInt(req.params.date)/ 1000)
  res.json({"unix":unix})   
  }  
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
