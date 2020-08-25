let sql = 
    `SELECT 
        match_id, 
        season, 
        date, 
        team_home, 
        team_away, 
        competition, 
        attendance,
        home_goals,
        away_goals
    FROM results
    WHERE competition = 'League' AND 
        team_home = 'Dagenham & Redbridge'
    ORDER BY date`;

module.exports.sql = sql;