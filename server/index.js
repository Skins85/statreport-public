const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const util = require('./server-util');
const db = require('../config/db');

const app = express();
app.use(bodyParser.urlencoded({ extended: false })); // Middleware that allows you to handle data passed by requests
app.use(pino);

// Fetch all players
app.get('/players', (req, res) => {
  let sql = 'SELECT * FROM `drfc_players`';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.setHeader('Content-Type', 'application/json');
    res.send(({ players: results }));
  })
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

// Fetch all text snippets
app.get('/snippets', (req, res) => {
  let sql = 'SELECT * FROM `snippets`';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.setHeader('Content-Type', 'application/json');
    res.send(({ snippets: results }));
  })
});

// Add match data
app.post('/admin/add-result-complete', (req, res) => {
  // Get data object from POST request
  const resultsData = req.body;
  console.log(resultsData);
  util.targetTableInsert(resultsData, 'results');
  util.targetTableInsert(resultsData, 'match_scorers');
  util.targetTableInsert(resultsData, 'attendances');
  util.targetTableInsert(resultsData, 'assists');
  res.end();
});

app.listen('3001', () => {
    console.log('Server started on port 3001');
})