const express = require('express');
// var React = require('react');
// var ReactDOMServer = require('react-dom/server');
// var App = require('../src/App');
// const FormSubmitted = require('../src/components/form/journey/add-result-complete');


var fs = require('fs');
var path = require('path');

const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const util = require('./server-util');

// Create connection
const db = require('../config/db');

const app = express();
app.use(bodyParser.urlencoded({ extended: false })); // Middleware that allows you to handle data passed by requests
app.use(pino);

// Add test data
app.post('/admin/add-result-complete', (req, res) => {
  // Get data object from POST request
  const resultsData = req.body;
  util.targetTableInsert(resultsData, 'results');
  util.targetTableInsert(resultsData, 'match_scorers');
  res.end();
});

// Fetch all teams
app.get('/teams', (req, res) => {
  let sql = 'SELECT `team_id`, `team_name` FROM `teams`';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.setHeader('Content-Type', 'application/json');
    res.send(({ results: results }));
  })
});

// Fetch all players
app.get('/players', (req, res) => {
  let sql = 'SELECT * FROM `drfc_players`';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.setHeader('Content-Type', 'application/json');
    res.send(({ players: results }));
  })
});

// Fetch all results
app.get('/get-results', (req, res) => {
  var results_query = require('../server/results/data-results');
  db.query(results_query, (err, results) => {
      if (err) throw err;
      res.setHeader('Content-Type', 'application/json');
      res.send(({ results: results }));
  })
})

// Fetch all goals
app.get('/get-goals-all', (req, res) => {
  var results_query = require('../server/players/data-goals-all');
  db.query(results_query, (err, results) => {
      if (err) throw err;
      res.setHeader('Content-Type', 'application/json');
      res.send(({ results: results }));
  })
})

// Fetch player goals totals
app.get('/get-player-goals-total', (req, res) => {
  var results_query = require('../server/players/data-player-goals-total');
  db.query(results_query, (err, results) => {
      if (err) throw err;
      res.setHeader('Content-Type', 'application/json');
      res.send(({ results: results }));
  })
})

// Fetch all players
app.get('/get-players', (req, res) => {
  var players_query = require('../server/players/data-players');
  db.query(players_query, (err, results) => {
      if (err) throw err;
      res.setHeader('Content-Type', 'application/json');
      res.send(({ results: results }));
  })
})

// Fetch unique player (starts)
app.get('/get-players-starts/:id', (req, res) => {
  let player_id = `${req.params.id}`;
  module.exports = player_id;
  let player_starts = require('../server/players/data-player-starts');
  db.query(player_starts, (err, results) => {
      if (err) throw err;
      res.setHeader('Content-Type', 'application/json');
      res.send(({ results: results }));
  })
})

// Fetch unique player (subs)
app.get('/get-players-subs/:id', (req, res) => {
  let sub_player_id = `${req.params.id}`;
  module.exports = sub_player_id;
  let player_subs = require('../server/players/data-player-subs');
  db.query(player_subs, (err, results) => {
      if (err) throw err;
      res.setHeader('Content-Type', 'application/json');
      res.send(({ results: results }));
  })
})

// Fetch unique player (goals)
app.get('/get-players-goals/:id', (req, res) => {
  let goal_player_id = `${req.params.id}`;
  module.exports = goal_player_id;
  let player_goals = require('../server/players/data-player-goals');
  db.query(player_goals, (err, results) => {
    if (err) throw err;
    res.setHeader('Content-Type', 'application/json');
    res.send(({ results: results }));
  })
})

// Fetch all attendances
app.get('/get-attendances', (req, res) => {
  let attendances_query = require('../server/attendances/data-attendances');
  db.query(attendances_query, (err, results) => {
      if (err) throw err;
      res.setHeader('Content-Type', 'application/json');
      res.send(({ attendances: results }));
  })
})

// Fetch all league positions
app.get('/get-league-positions', (req, res) => {
  let league_positions_query = require('../server/league-positions/data-league-positions');
  db.query(league_positions_query, (err, results) => {
      if (err) throw err;
      res.setHeader('Content-Type', 'application/json');
      res.send(({ league_positions: results }));
  })
})

// Fetch all links
app.get('/get-navigation-links', (req, res) => {
  let linksJson = require('../server/links/data-links.json');
    res.send(({ navigation_links: linksJson }));
})

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);