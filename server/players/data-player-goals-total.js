let sql = 
    `SELECT Player, first_name, surname, count(*) AS count FROM (
        SELECT s_drfc_goal_1_scorer AS Player, first_name, surname FROM match_scorers INNER JOIN drfc_players ON match_scorers.s_drfc_goal_1_scorer = drfc_players.player_id
            WHERE NOT s_drfc_goal_1_scorer = ''
            UNION ALL
        SELECT s_drfc_goal_2_scorer AS Player, first_name, surname FROM match_scorers INNER JOIN drfc_players ON match_scorers.s_drfc_goal_2_scorer = drfc_players.player_id
            WHERE NOT s_drfc_goal_2_scorer = ''
            UNION ALL
        SELECT s_drfc_goal_3_scorer AS Player, first_name, surname FROM match_scorers INNER JOIN drfc_players ON match_scorers.s_drfc_goal_3_scorer = drfc_players.player_id
            WHERE NOT s_drfc_goal_3_scorer = ''
            UNION ALL
        SELECT s_drfc_goal_4_scorer AS Player, first_name, surname FROM match_scorers INNER JOIN drfc_players ON match_scorers.s_drfc_goal_4_scorer = drfc_players.player_id
            WHERE NOT s_drfc_goal_4_scorer = ''
            UNION ALL
        SELECT s_drfc_goal_5_scorer AS Player, first_name, surname FROM match_scorers INNER JOIN drfc_players ON match_scorers.s_drfc_goal_5_scorer = drfc_players.player_id
            WHERE NOT s_drfc_goal_5_scorer = ''
            UNION ALL
        SELECT s_drfc_goal_6_scorer AS Player, first_name, surname FROM match_scorers INNER JOIN drfc_players ON match_scorers.s_drfc_goal_6_scorer = drfc_players.player_id
            WHERE NOT s_drfc_goal_6_scorer = ''
            UNION ALL
        SELECT s_drfc_goal_7_scorer AS Player, first_name, surname FROM match_scorers INNER JOIN drfc_players ON match_scorers.s_drfc_goal_7_scorer = drfc_players.player_id
            WHERE NOT s_drfc_goal_7_scorer = ''
            UNION ALL
        SELECT s_drfc_goal_8_scorer AS Player, first_name, surname FROM match_scorers INNER JOIN drfc_players ON match_scorers.s_drfc_goal_8_scorer = drfc_players.player_id
            WHERE NOT s_drfc_goal_8_scorer = ''
    ) a
    GROUP BY Player, first_name, surname
    ORDER BY count DESC`;

    module.exports.sql = sql;