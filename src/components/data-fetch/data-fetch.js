// index.js
const axios = require('axios');

async function getFirstResult() {
  const response = await axios.get('https://www.statreport.co.uk/api/json/data-players-goals-all.php');
  return response.results[0].first_name;
}

module.exports = getFirstResult;