<?php
    header('Content-Type: application/json');

    include '../../config/db.php';

    $stmt = $conn->prepare(
        "SELECT match_scorers.match_id, s_drfc_goal_1_scorer AS scorer_id, season, drfc_goal_1_minute AS goal_time
            from match_scorers
            INNER JOIN results ON match_scorers.match_id = results.match_id
            WHERE NOT s_drfc_goal_1_scorer='' AND `drfc_goal_1_own` != ''
            union all
        SELECT match_scorers.match_id, s_drfc_goal_2_scorer AS scorer_id, season, drfc_goal_2_minute AS goal_time
            from match_scorers
            INNER JOIN results ON match_scorers.match_id = results.match_id
            WHERE NOT s_drfc_goal_2_scorer='' AND `drfc_goal_2_own` != ''
            union all
        SELECT match_scorers.match_id, s_drfc_goal_3_scorer AS scorer_id, season, drfc_goal_3_minute AS goal_time
            from match_scorers
            INNER JOIN results ON match_scorers.match_id = results.match_id
            WHERE NOT s_drfc_goal_3_scorer='' AND `drfc_goal_3_own` != ''
            union all
        SELECT match_scorers.match_id, s_drfc_goal_4_scorer AS scorer_id, season, drfc_goal_4_minute AS goal_time
            from match_scorers
            INNER JOIN results ON match_scorers.match_id = results.match_id
            WHERE NOT s_drfc_goal_4_scorer='' AND `drfc_goal_4_own` != ''
            union all
        SELECT match_scorers.match_id, s_drfc_goal_5_scorer AS scorer_id, season, drfc_goal_5_minute AS goal_time
            from match_scorers
            INNER JOIN results ON match_scorers.match_id = results.match_id
            WHERE NOT s_drfc_goal_5_scorer='' AND `drfc_goal_5_own` != ''
            union all
        SELECT match_scorers.match_id, s_drfc_goal_6_scorer AS scorer_id, season, drfc_goal_6_minute AS goal_time
            from match_scorers
            INNER JOIN results ON match_scorers.match_id = results.match_id
            WHERE NOT s_drfc_goal_6_scorer='' AND `drfc_goal_6_own` != ''
            union all
        SELECT match_scorers.match_id, s_drfc_goal_7_scorer AS scorer_id, season, drfc_goal_7_minute AS goal_time
            from match_scorers
            INNER JOIN results ON match_scorers.match_id = results.match_id
            WHERE NOT s_drfc_goal_7_scorer='' AND `drfc_goal_7_own` != ''
            union all
        SELECT match_scorers.match_id, s_drfc_goal_8_scorer AS scorer_id, season, drfc_goal_8_minute AS goal_time
            from match_scorers
            INNER JOIN results ON match_scorers.match_id = results.match_id
            WHERE NOT s_drfc_goal_8_scorer='' AND `drfc_goal_8_own` != ''"
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
        );
    }
    echo '{"results":';
        echo json_encode($players_array);
    echo '}';
?>