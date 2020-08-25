var player_id = require('../index');

let sql = `SELECT first_name, surname, date, season, competition, team_home, team_away, home_goals, away_goals, player from (
    SELECT first_name, surname, date, season, competition, team_home, team_away, home_goals, away_goals, player_1 as player
        FROM results
        INNER JOIN drfc_players ON results.player_1 = drfc_players.player_id
      WHERE results.player_1 = '${player_id}'
        union all
    SELECT first_name, surname, date, season, competition, team_home, team_away, home_goals, away_goals, player_2 as player
        FROM results
        INNER JOIN drfc_players ON results.player_2 = drfc_players.player_id
      WHERE results.player_2 = '${player_id}'
        union all
    SELECT first_name, surname, date, season, competition, team_home, team_away, home_goals, away_goals, player_3 as player
        FROM results
        INNER JOIN drfc_players ON results.player_3 = drfc_players.player_id
      WHERE results.player_3 = '${player_id}'
        union all
    SELECT first_name, surname, date, season, competition, team_home, team_away, home_goals, away_goals, player_4 as player
        FROM results
        INNER JOIN drfc_players ON results.player_4 = drfc_players.player_id
      WHERE results.player_4 = '${player_id}'
        union ALL
    SELECT first_name, surname, date, season, competition, team_home, team_away, home_goals, away_goals, player_5 as player
        FROM results
        INNER JOIN drfc_players ON results.player_5 = drfc_players.player_id
      WHERE results.player_5 = '${player_id}'
        union all
    SELECT first_name, surname, date, season, competition, team_home, team_away, home_goals, away_goals, player_6 as player
        FROM results
        INNER JOIN drfc_players ON results.player_6 = drfc_players.player_id
      WHERE results.player_6 = '${player_id}'
        union all
    SELECT first_name, surname, date, season, competition, team_home, team_away, home_goals, away_goals, player_7 as player
        FROM results
        INNER JOIN drfc_players ON results.player_7 = drfc_players.player_id
      WHERE results.player_7 = '${player_id}'
        union all
    SELECT first_name, surname, date, season, competition, team_home, team_away, home_goals, away_goals, player_8 as player
        FROM results
        INNER JOIN drfc_players ON results.player_8 = drfc_players.player_id
      WHERE results.player_8 = '${player_id}'
        union all
    SELECT first_name, surname, date, season, competition, team_home, team_away, home_goals, away_goals, player_9 as player
        FROM results
        INNER JOIN drfc_players ON results.player_9 = drfc_players.player_id
      WHERE results.player_9 = '${player_id}'
        union all
    SELECT first_name, surname, date, season, competition, team_home, team_away, home_goals, away_goals, player_10 as player
        FROM results
        INNER JOIN drfc_players ON results.player_10 = drfc_players.player_id
      WHERE results.player_10 = '${player_id}'
        union ALL
    SELECT first_name, surname, date, season, competition, team_home, team_away, home_goals, away_goals, player_11 as player
        FROM results
        INNER JOIN drfc_players ON results.player_11 = drfc_players.player_id
      WHERE results.player_11 = '${player_id}'
    ) a
group by first_name, surname, date, season, competition, team_home, team_away, home_goals, away_goals, player
order by date DESC`;

module.exports.sql = sql;