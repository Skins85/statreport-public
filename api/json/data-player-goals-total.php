<?php
    header('Content-Type: application/json');

    include '../../config/db.php';
    $season_exclude = '2010-11';

        $stmt = $conn->prepare(
          "SELECT Player, first_name, surname, count(*) AS count FROM (
            SELECT match_scorers.s_drfc_goal_1_scorer AS Player, drfc_players.first_name, drfc_players.surname, results.season
                FROM match_scorers 
                JOIN drfc_players 
                ON match_scorers.s_drfc_goal_1_scorer = drfc_players.player_id
                JOIN results
                ON match_scorers.match_id = results.match_id
                WHERE NOT s_drfc_goal_1_scorer = ''
                AND season != '$season_exclude'
                UNION ALL
            SELECT match_scorers.s_drfc_goal_2_scorer AS Player, drfc_players.first_name, drfc_players.surname, results.season
                FROM match_scorers 
                JOIN drfc_players 
                ON match_scorers.s_drfc_goal_2_scorer = drfc_players.player_id
                JOIN results
                ON match_scorers.match_id = results.match_id
                WHERE NOT s_drfc_goal_2_scorer = ''
                AND season != '$season_exclude'
                UNION ALL
            SELECT match_scorers.s_drfc_goal_3_scorer AS Player, drfc_players.first_name, drfc_players.surname, results.season
                FROM match_scorers 
                JOIN drfc_players 
                ON match_scorers.s_drfc_goal_3_scorer = drfc_players.player_id
                JOIN results
                ON match_scorers.match_id = results.match_id
                WHERE NOT s_drfc_goal_3_scorer = ''
                AND season != '$season_exclude'
                UNION ALL
            SELECT match_scorers.s_drfc_goal_4_scorer AS Player, drfc_players.first_name, drfc_players.surname, results.season
                FROM match_scorers 
                JOIN drfc_players 
                ON match_scorers.s_drfc_goal_4_scorer = drfc_players.player_id
                JOIN results
                ON match_scorers.match_id = results.match_id
                WHERE NOT s_drfc_goal_4_scorer = ''
                AND season != '$season_exclude'
                UNION ALL
            SELECT match_scorers.s_drfc_goal_5_scorer AS Player, drfc_players.first_name, drfc_players.surname, results.season
                FROM match_scorers 
                JOIN drfc_players 
                ON match_scorers.s_drfc_goal_5_scorer = drfc_players.player_id
                JOIN results
                ON match_scorers.match_id = results.match_id
                WHERE NOT s_drfc_goal_5_scorer = ''
                AND season != '$season_exclude'
                UNION ALL
            SELECT match_scorers.s_drfc_goal_6_scorer AS Player, drfc_players.first_name, drfc_players.surname, results.season
                FROM match_scorers 
                JOIN drfc_players 
                ON match_scorers.s_drfc_goal_6_scorer = drfc_players.player_id
                JOIN results
                ON match_scorers.match_id = results.match_id
                WHERE NOT s_drfc_goal_6_scorer = ''
                AND season != '$season_exclude'
                UNION ALL
            SELECT match_scorers.s_drfc_goal_7_scorer AS Player, drfc_players.first_name, drfc_players.surname, results.season
                FROM match_scorers 
                JOIN drfc_players 
                ON match_scorers.s_drfc_goal_7_scorer = drfc_players.player_id
                JOIN results
                ON match_scorers.match_id = results.match_id
                WHERE NOT s_drfc_goal_7_scorer = ''
                AND season != '$season_exclude'
                UNION ALL
            SELECT match_scorers.s_drfc_goal_8_scorer AS Player, drfc_players.first_name, drfc_players.surname, results.season
                FROM match_scorers 
                JOIN drfc_players 
                ON match_scorers.s_drfc_goal_8_scorer = drfc_players.player_id
                JOIN results
                ON match_scorers.match_id = results.match_id
                WHERE NOT s_drfc_goal_8_scorer = ''
                AND season != '$season_exclude'
        ) a
        GROUP BY Player, first_name, surname
        ORDER BY count DESC"
        );
        $stmt->execute();

        while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $player_goals[] = array (
                'Player'=>$row['Player'],
                'first_name'=>$row['first_name'],
                'surname'=>$row['surname'],
                'count'=>$row['count']
            );
        }
        echo '{"results":';
          echo json_encode($player_goals);
        echo '}';
?>