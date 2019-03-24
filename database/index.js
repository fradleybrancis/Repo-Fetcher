const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('It works');
});

let repoSchema = mongoose.Schema({
  id: { 
    type: Number,
    unique: true
  },
  name: String,
  repo: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (id, name, repoName, forks) => {
  var repo = new Repo({ id: id, name: name, repo: repoName, forks: forks })
  repo.save((error, repo) => {
    if (error) {
      console.log(error);
    } else {
      console.log(repo);
    }
  })
}

let topForks = (callback) => {
  Repo.find().
  sort({forks: -1}).
  limit(25).
  exec((error, repos) => {
    if (error) {
      callback(error);
    } else {
      callback(null, repos);
    }
  });
};

module.exports.topForks = topForks;
module.exports.save = save;