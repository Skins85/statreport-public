const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const util = require('./server-util');
const db = require('../config/db');
const shrinkRay = require('shrink-ray');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false })); // Middleware that allows you to handle data passed by requests
app.use(pino);
app.use(shrinkRay()); // Compress requests for use with Brotli

app.get('*.js', (req, res, next) => {
  if (req.header('Accept-Encoding').includes('br')) {
    req.url = req.url + '.br';
    console.log(req.header('Accept-Encoding'));
    res.set('Content-Encoding', 'br');
    res.set('Content-Type', 'application/javascript; charset=UTF-8');
  }
  next();
});

// Fetch all players
app.get('/players', (req, res) => {
  let sql = 'SELECT * FROM `drfc_players`';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.setHeader('Content-Type', 'application/json');
    res.send(({ players: results }));
    console.log('results data')
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

// POST data config set in webpack.dev.js

app.listen('3002', () => {
    console.log('Server running on port 3002');
})