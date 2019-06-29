const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = new mongoose.Schema({
  // TODO: your schema here!
  name: String,
  repos: Array


});

let Repo = mongoose.model('Repo', repoSchema);

let save = (name, repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  var gitUser = new Repo({name, repos});
  gitUser.save((err) => {
    if (err) {
      console.error(err);
    }
    console.log('success saving');
  });

  // worry about duplicates later
}

let getAll = (name, callback) => {
  Repo.find({ name: name }, 'repos', (err, repos) => {
    if (err) {console.error('error getAll', err)}
    else {
      console.log('REPOS', repos[0]);
      callback(repos);
    }
  })
}

module.exports.save = save;
module.exports.getAll = getAll;