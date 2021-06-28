<?php
    header('Content-Type: application/json');

    include '../../config/db.php';

    $assistsQuery = '';
    $season_exclude = '';

    // For later: dynamically create query by loop
    // for ($i = 1; $i <= 8; $i++) {     
    //     $assistsQuery.= "SELECT first_name, surname, season, match_scorers.match_id, drfc_goal_".$i."_assist AS assister_id, drfc_goal_".$i."_minute AS goal_time ";
    //     $assistsQuery.= "FROM match_scorers ";
    //     $assistsQuery.= "INNER JOIN drfc_players ON match_scorers.drfc_goal_".$i."_assist = drfc_players.player_id ";
    //     $assistsQuery.= "INNER JOIN results ON match_scorers.match_id = results.match_id ";
    //     $assistsQuery.= "WHERE NOT drfc_goal_".$i."_assist= '' ";
    //     $assistsQuery.= "AND season != '$season_exclude' ";
    //     $assistsQuery.= "UNION ALL ";
    // }

    $stmt = $conn->prepare(
        "SELECT first_name, surname, season, match_scorers.match_id, drfc_goal_1_assist AS assister_id, drfc_goal_1_minute AS goal_time
            FROM match_scorers
            INNER JOIN drfc_players 
                ON match_scorers.drfc_goal_1_assist = drfc_players.player_id
            INNER JOIN results 
                ON match_scorers.match_id = results.match_id
            WHERE NOT drfc_goal_1_assist = '' AND season != '$season_exclude'
            UNION ALL
        SELECT first_name, surname, season, match_scorers.match_id, drfc_goal_2_assist AS assister_id, drfc_goal_2_minute AS goal_time
            FROM match_scorers
            INNER JOIN drfc_players 
                ON match_scorers.drfc_goal_2_assist = drfc_players.player_id
            INNER JOIN results 
                ON match_scorers.match_id = results.match_id
            WHERE NOT drfc_goal_2_assist = '' AND season != '$season_exclude'
            UNION ALL
        SELECT first_name, surname, season, match_scorers.match_id, drfc_goal_3_assist AS assister_id, drfc_goal_3_minute AS goal_time
            FROM match_scorers
            INNER JOIN drfc_players 
                ON match_scorers.drfc_goal_3_assist = drfc_players.player_id
            INNER JOIN results 
                ON match_scorers.match_id = results.match_id
            WHERE NOT drfc_goal_3_assist = '' AND season != '$season_exclude'
            UNION ALL
        SELECT first_name, surname, season, match_scorers.match_id, drfc_goal_4_assist AS assister_id, drfc_goal_4_minute AS goal_time
            FROM match_scorers
            INNER JOIN drfc_players 
                ON match_scorers.drfc_goal_4_assist = drfc_players.player_id
            INNER JOIN results 
                ON match_scorers.match_id = results.match_id
            WHERE NOT drfc_goal_4_assist = '' AND season != '$season_exclude'
            UNION ALL
        SELECT first_name, surname, season, match_scorers.match_id, drfc_goal_5_assist AS assister_id, drfc_goal_5_minute AS goal_time
            FROM match_scorers
            INNER JOIN drfc_players 
                ON match_scorers.drfc_goal_5_assist = drfc_players.player_id
            INNER JOIN results 
                ON match_scorers.match_id = results.match_id
            WHERE NOT drfc_goal_5_assist = '' AND season != '$season_exclude'
            UNION ALL
        SELECT first_name, surname, season, match_scorers.match_id, drfc_goal_6_assist AS assister_id, drfc_goal_6_minute AS goal_time
            FROM match_scorers
            INNER JOIN drfc_players 
                ON match_scorers.drfc_goal_6_assist = drfc_players.player_id
            INNER JOIN results 
                ON match_scorers.match_id = results.match_id
            WHERE NOT drfc_goal_6_assist = '' AND season != '$season_exclude'
            UNION ALL
        SELECT first_name, surname, season, match_scorers.match_id, drfc_goal_7_assist AS assister_id, drfc_goal_7_minute AS goal_time
            FROM match_scorers
            INNER JOIN drfc_players 
                ON match_scorers.drfc_goal_7_assist = drfc_players.player_id
            INNER JOIN results 
                ON match_scorers.match_id = results.match_id
            WHERE NOT drfc_goal_7_assist = '' AND season != '$season_exclude'
            UNION ALL
        SELECT first_name, surname, season, match_scorers.match_id, drfc_goal_8_assist AS assister_id, drfc_goal_8_minute AS goal_time
            FROM match_scorers
            INNER JOIN drfc_players 
                ON match_scorers.drfc_goal_8_assist = drfc_players.player_id
            INNER JOIN results 
                ON match_scorers.match_id = results.match_id
            WHERE NOT drfc_goal_8_assist = '' AND season != '$season_exclude'"
    );
    $stmt->execute();

    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $players_array[] = array (
            'first_name'=>$row['first_name'],
            'surname'=>$row['surname'],
            'match_id'=>$row['match_id'],
            'assister_id'=>$row['assister_id'],
            'goal_time'=>$row['goal_time'],
            'season'=>$row['season'],
        );
    }
    echo '{"results":';
        echo json_encode($players_array);
    echo '}';
?>