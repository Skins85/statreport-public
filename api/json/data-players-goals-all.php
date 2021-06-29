<?php
    header('Content-Type: application/json');

    include '../../config/db.php';

    $season_exclude = '';

    $stmt = $conn->prepare(
        "SELECT first_name, surname, season, competition, match_scorers.match_id, s_drfc_goal_1_scorer AS scorer_id, season, drfc_goal_1_minute AS goal_time
        from match_scorers
        INNER JOIN drfc_players ON match_scorers.s_drfc_goal_1_scorer = drfc_players.player_id
        INNER JOIN results ON match_scorers.match_id = results.match_id
        WHERE NOT s_drfc_goal_1_scorer=''
        AND season != '$season_exclude'
        union all
      SELECT first_name, surname, season, competition, match_scorers.match_id, s_drfc_goal_2_scorer, season, drfc_goal_2_minute
        from match_scorers
        INNER JOIN drfc_players ON match_scorers.s_drfc_goal_2_scorer = drfc_players.player_id
        INNER JOIN results ON match_scorers.match_id = results.match_id
        WHERE NOT s_drfc_goal_2_scorer=''
        AND season != '$season_exclude'
        union all
      SELECT first_name, surname, season, competition, match_scorers.match_id, s_drfc_goal_3_scorer, season, drfc_goal_3_minute
        from match_scorers
        INNER JOIN drfc_players ON match_scorers.s_drfc_goal_3_scorer = drfc_players.player_id
        INNER JOIN results ON match_scorers.match_id = results.match_id
        WHERE NOT s_drfc_goal_3_scorer=''
        AND season != '$season_exclude'
        union all
      SELECT first_name, surname, season, competition, match_scorers.match_id, s_drfc_goal_4_scorer, season, drfc_goal_4_minute
        from match_scorers
        INNER JOIN drfc_players ON match_scorers.s_drfc_goal_4_scorer = drfc_players.player_id
        INNER JOIN results ON match_scorers.match_id = results.match_id
        WHERE NOT s_drfc_goal_4_scorer=''
        AND season != '$season_exclude'
        union all
      SELECT first_name, surname, season, competition, match_scorers.match_id, s_drfc_goal_5_scorer, season, drfc_goal_5_minute
        from match_scorers
        INNER JOIN drfc_players ON match_scorers.s_drfc_goal_5_scorer = drfc_players.player_id
        INNER JOIN results ON match_scorers.match_id = results.match_id
        WHERE NOT s_drfc_goal_5_scorer=''
        AND season != '$season_exclude'
        union all
      SELECT first_name, surname, season, competition, match_scorers.match_id, s_drfc_goal_6_scorer, season, drfc_goal_6_minute
        from match_scorers
        INNER JOIN drfc_players ON match_scorers.s_drfc_goal_6_scorer = drfc_players.player_id
        INNER JOIN results ON match_scorers.match_id = results.match_id
        WHERE NOT s_drfc_goal_6_scorer=''
        AND season != '$season_exclude'
        union all
      SELECT first_name, surname, season, competition, match_scorers.match_id, s_drfc_goal_7_scorer, season, drfc_goal_7_minute
        from match_scorers
        INNER JOIN drfc_players ON match_scorers.s_drfc_goal_7_scorer = drfc_players.player_id
        INNER JOIN results ON match_scorers.match_id = results.match_id
        WHERE NOT s_drfc_goal_7_scorer=''
        AND season != '$season_exclude'
        union all
      SELECT first_name, surname, season, competition, match_scorers.match_id, s_drfc_goal_8_scorer, season, drfc_goal_8_minute
        from match_scorers
        INNER JOIN drfc_players ON match_scorers.s_drfc_goal_8_scorer = drfc_players.player_id
        INNER JOIN results ON match_scorers.match_id = results.match_id
        WHERE NOT s_drfc_goal_8_scorer=''
        AND season != '$season_exclude'"
    );
    $stmt->execute();

    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $players_array[] = array (
            'first_name'=>$row['first_name'],
            'surname'=>$row['surname'],
            'match_id'=>$row['match_id'],
            'scorer_id'=>$row['scorer_id'],
            'goal_time'=>$row['goal_time'],
            'season'=>$row['season'],
            'competition'=>$row['competition']
        );
    }
    echo '{"results":';
        echo json_encode($players_array);
    echo '}';
?>