const express = require('express');
const bodyParser = require('body-parser');
const getReposByUsername = require('../helpers/github.js');
const db = require('../database/index.js');
const morgan = require('morgan');

let app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res, next) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  const user = req.body.text;
  
  getReposByUsername(user, (body) => {
    parsed = JSON.parse(body);
    for (var i = 0; i < parsed.length; i++) {
      db.save(parsed[i].id, user, parsed[i].name, parsed[i].forks);
    }
    res.send(body);
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.topForks((error, repos) => {
    if (error) {
      console.log(error);
    } else {
      res.send(repos);
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

