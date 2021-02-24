<?php
    header('Content-Type: application/json');

    include '../../config/db.php';

    $season_exclude = '2012-13';

    $stmt = $conn->prepare(
        "SELECT first_name, surname, season, assists.match_id, goal_1_assist_player_id AS assister_id, season
        from assists
        INNER JOIN drfc_players ON assists.goal_1_assist_player_id = drfc_players.player_id
        INNER JOIN results ON assists.match_id = results.match_id
        WHERE NOT goal_1_assist_player_id=''
        AND season != '$season_exclude'
        union all
      SELECT first_name, surname, season, assists.match_id, goal_2_assist_player_id AS assister_id, season
        from assists
        INNER JOIN drfc_players ON assists.goal_2_assist_player_id = drfc_players.player_id
        INNER JOIN results ON assists.match_id = results.match_id
        WHERE NOT goal_2_assist_player_id=''
        AND season != '$season_exclude'
        union all
      SELECT first_name, surname, season, assists.match_id, goal_3_assist_player_id AS assister_id, season
        from assists
        INNER JOIN drfc_players ON assists.goal_3_assist_player_id = drfc_players.player_id
        INNER JOIN results ON assists.match_id = results.match_id
        WHERE NOT goal_3_assist_player_id=''
        AND season != '$season_exclude'
        union all
      SELECT first_name, surname, season, assists.match_id, goal_4_assist_player_id AS assister_id, season
        from assists
        INNER JOIN drfc_players ON assists.goal_4_assist_player_id = drfc_players.player_id
        INNER JOIN results ON assists.match_id = results.match_id
        WHERE NOT goal_4_assist_player_id=''
        AND season != '$season_exclude'
        union all
      SELECT first_name, surname, season, assists.match_id, goal_5_assist_player_id AS assister_id, season
        from assists
        INNER JOIN drfc_players ON assists.goal_5_assist_player_id = drfc_players.player_id
        INNER JOIN results ON assists.match_id = results.match_id
        WHERE NOT goal_5_assist_player_id=''
        AND season != '$season_exclude'
        union all
      SELECT first_name, surname, season, assists.match_id, goal_6_assist_player_id AS assister_id, season
        from assists
        INNER JOIN drfc_players ON assists.goal_6_assist_player_id = drfc_players.player_id
        INNER JOIN results ON assists.match_id = results.match_id
        WHERE NOT goal_6_assist_player_id=''
        AND season != '$season_exclude'
        union all
      SELECT first_name, surname, season, assists.match_id, goal_7_assist_player_id AS assister_id, season
        from assists
        INNER JOIN drfc_players ON assists.goal_7_assist_player_id = drfc_players.player_id
        INNER JOIN results ON assists.match_id = results.match_id
        WHERE NOT goal_7_assist_player_id=''
        AND season != '$season_exclude'
        union all
      SELECT first_name, surname, season, assists.match_id, goal_8_assist_player_id AS assister_id, season
        from assists
        INNER JOIN drfc_players ON assists.goal_8_assist_player_id = drfc_players.player_id
        INNER JOIN results ON assists.match_id = results.match_id
        WHERE NOT goal_8_assist_player_id=''
        AND season != '$season_exclude'"
    );
    $stmt->execute();

    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $players_array[] = array (
            'first_name'=>$row['first_name'],
            'surname'=>$row['surname'],
            'match_id'=>$row['match_id'],
            'assister_id'=>$row['assister_id'],
            'season'=>$row['season'],
        );
    }
    echo '{"results":';
        echo json_encode($players_array);
    echo '}';
?>