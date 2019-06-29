const express = require('express');
const getReposByUsername = require('../helpers/github.js');
const save = require('../database/index.js');
const parser = require('body-parser');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

var mostRecent = 'tlee0728';

app
  .post('/repos', (req, res) => {
    // TODO - your code here!
    // This route should take the github username provided
    // and get the repo information from the github API, then
    // save the repo information in the database
    const username = req.body.user;
    mostRecent = username;
    getReposByUsername.getReposByUsername(username, (data) => {
      save.save(username, data);
      var toSend = [];
      for (var i = 0; i < 25; i++) {
        if (data[i] === undefined) {break;}
        toSend.push(data[i]);
      }
      res.status(201).send(toSend);
      });
  });

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  save.getAll(mostRecent, (repos) => {
    // console.log('repos to send back to client', repos);
    res.status(200).send(repos);
  })

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

