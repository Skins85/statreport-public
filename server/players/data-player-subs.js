var sub_player_id = require('../index');

let sql = `SELECT first_name, surname, date, season, competition, team_home, team_away, home_goals, away_goals, player from (
    SELECT first_name, surname, date, season, competition, team_home, team_away, home_goals, away_goals, sub_1 as player
        FROM results
        INNER JOIN drfc_players ON results.sub_1 = drfc_players.player_id
      WHERE results.sub_1 = '${sub_player_id}'
        union all
    SELECT first_name, surname, date, season, competition, team_home, team_away, home_goals, away_goals, sub_2 as player
        FROM results
        INNER JOIN drfc_players ON results.sub_2 = drfc_players.player_id
      WHERE results.sub_2 = '${sub_player_id}'
        union all
    SELECT first_name, surname, date, season, competition, team_home, team_away, home_goals, away_goals, sub_3 as player
        FROM results
        INNER JOIN drfc_players ON results.sub_3 = drfc_players.player_id
      WHERE results.sub_3 = '${sub_player_id}'
        union all
    SELECT first_name, surname, date, season, competition, team_home, team_away, home_goals, away_goals, sub_4 as player
        FROM results
        INNER JOIN drfc_players ON results.sub_4 = drfc_players.player_id
      WHERE results.sub_4 = '${sub_player_id}'
        union ALL
    SELECT first_name, surname, date, season, competition, team_home, team_away, home_goals, away_goals, sub_5 as player
        FROM results
        INNER JOIN drfc_players ON results.sub_5 = drfc_players.player_id
      WHERE results.sub_5 = '${sub_player_id}'
    ) a
group by first_name, surname, date, season, competition, team_home, team_away, home_goals, away_goals, player
order by date DESC`;

module.exports.sql = sql;