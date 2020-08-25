let sql = 
    `SELECT 
        match_id, 
        season, 
        date, 
        team_home, 
        team_away, 
        competition, 
        league_position
    FROM results
    WHERE competition = 'League'
    ORDER BY date`;

module.exports.sql = sql;