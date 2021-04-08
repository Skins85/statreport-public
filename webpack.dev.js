const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const util = require('./server/server-util');
const bodyParser = require('body-parser');

module.exports = merge(common, {
    mode: 'development',
    
    // Avoid 404 when route is manually refreshed
    devServer: {
        historyApiFallback: true,
        before(app) {
            app.use(bodyParser.urlencoded({ extended: false })); // Middleware that allows you to handle data passed by requests
            app.post("/admin/add-result-complete", bodyParser.json(), function(req, res){
                const resultsData = req.body;
                console.log(resultsData);
                
                res.send("Data sent to database: " + JSON.stringify(resultsData));

                util.targetTableInsert(resultsData, 'results');
                util.targetTableInsert(resultsData, 'match_scorers');
                util.targetTableInsert(resultsData, 'attendances');
                util.targetTableInsert(resultsData, 'assists');
            })
  
        },
        proxy: {
            '/api': {
                target: 'http://localhost:3002',
                pathRewrite: { '^/api': '' }
            }
        }
    }
 
});