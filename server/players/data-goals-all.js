var goal_player_id = require('../index');

let sql = 
    `SELECT first_name, surname, match_scorers.match_id, s_drfc_goal_1_scorer AS scorer_id, season
      from match_scorers
      INNER JOIN drfc_players ON match_scorers.s_drfc_goal_1_scorer = drfc_players.player_id
      INNER JOIN results ON match_scorers.match_id = results.match_id
      WHERE NOT s_drfc_goal_1_scorer=''
      union all
    SELECT first_name, surname, match_scorers.match_id, s_drfc_goal_2_scorer, season
      from match_scorers
      INNER JOIN drfc_players ON match_scorers.s_drfc_goal_2_scorer = drfc_players.player_id
      INNER JOIN results ON match_scorers.match_id = results.match_id
      WHERE NOT s_drfc_goal_2_scorer=''
      union all
    SELECT first_name, surname, match_scorers.match_id, s_drfc_goal_3_scorer, season
      from match_scorers
      INNER JOIN drfc_players ON match_scorers.s_drfc_goal_3_scorer = drfc_players.player_id
      INNER JOIN results ON match_scorers.match_id = results.match_id
      WHERE NOT s_drfc_goal_3_scorer=''
      union all
    SELECT first_name, surname, match_scorers.match_id, s_drfc_goal_4_scorer, season
      from match_scorers
      INNER JOIN drfc_players ON match_scorers.s_drfc_goal_4_scorer = drfc_players.player_id
      INNER JOIN results ON match_scorers.match_id = results.match_id
      WHERE NOT s_drfc_goal_4_scorer=''
      union all
    SELECT first_name, surname, match_scorers.match_id, s_drfc_goal_5_scorer, season
      from match_scorers
      INNER JOIN drfc_players ON match_scorers.s_drfc_goal_5_scorer = drfc_players.player_id
      INNER JOIN results ON match_scorers.match_id = results.match_id
      WHERE NOT s_drfc_goal_5_scorer=''
      union all
    SELECT first_name, surname, match_scorers.match_id, s_drfc_goal_6_scorer, season
      from match_scorers
      INNER JOIN drfc_players ON match_scorers.s_drfc_goal_6_scorer = drfc_players.player_id
      INNER JOIN results ON match_scorers.match_id = results.match_id
      WHERE NOT s_drfc_goal_6_scorer=''
      union all
    SELECT first_name, surname, match_scorers.match_id, s_drfc_goal_7_scorer, season
      from match_scorers
      INNER JOIN drfc_players ON match_scorers.s_drfc_goal_7_scorer = drfc_players.player_id
      INNER JOIN results ON match_scorers.match_id = results.match_id
      WHERE NOT s_drfc_goal_7_scorer=''
      union all
    SELECT first_name, surname, match_scorers.match_id, s_drfc_goal_8_scorer, season
      from match_scorers
      INNER JOIN drfc_players ON match_scorers.s_drfc_goal_8_scorer = drfc_players.player_id
      INNER JOIN results ON match_scorers.match_id = results.match_id
      WHERE NOT s_drfc_goal_8_scorer=''
    `;

module.exports.sql = sql;