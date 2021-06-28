<?php
    header('Content-Type: application/json');

    include '../../config/db.php';
    $season_exclude = '';
    
    $stmt = $conn->prepare(
        "SELECT Player, first_name, surname, count(*) AS count FROM (
            SELECT player_1 AS Player, first_name, surname, season 
                FROM results 
                INNER JOIN drfc_players ON results.player_1 = drfc_players.player_id
                WHERE season != '$season_exclude'
                UNION ALL
            SELECT player_2 AS Player, first_name, surname, season 
                FROM results 
                INNER JOIN drfc_players ON results.player_2 = drfc_players.player_id
                WHERE season != '$season_exclude'
                UNION ALL
            SELECT player_3 AS Player, first_name, surname, season 
                FROM results 
                INNER JOIN drfc_players ON results.player_3 = drfc_players.player_id
                WHERE season != '$season_exclude'
                UNION ALL
            SELECT player_4 AS Player, first_name, surname, season 
                FROM results 
                INNER JOIN drfc_players ON results.player_4 = drfc_players.player_id
                WHERE season != '$season_exclude'
                UNION ALL
            SELECT player_5 AS Player, first_name, surname, season 
                FROM results 
                INNER JOIN drfc_players ON results.player_5 = drfc_players.player_id
                WHERE season != '$season_exclude'
                UNION ALL
            SELECT player_6 AS Player, first_name, surname, season 
                FROM results 
                INNER JOIN drfc_players ON results.player_6 = drfc_players.player_id
                WHERE season != '$season_exclude'
                UNION ALL
            SELECT player_7 AS Player, first_name, surname, season 
                FROM results 
                INNER JOIN drfc_players ON results.player_7 = drfc_players.player_id
                WHERE season != '$season_exclude'
                UNION ALL
            SELECT player_8 AS Player, first_name, surname, season 
                FROM results 
                INNER JOIN drfc_players ON results.player_8 = drfc_players.player_id
                WHERE season != '$season_exclude'
                UNION ALL
            SELECT player_9 AS Player, first_name, surname, season 
                FROM results 
                INNER JOIN drfc_players ON results.player_9 = drfc_players.player_id
                WHERE season != '$season_exclude'
                UNION ALL
            SELECT player_10 AS Player, first_name, surname, season 
                FROM results 
                INNER JOIN drfc_players ON results.player_10 = drfc_players.player_id
                WHERE season != '$season_exclude'
                UNION ALL
            SELECT player_11 AS Player, first_name, surname, season 
                FROM results 
                INNER JOIN drfc_players ON results.player_11 = drfc_players.player_id
                WHERE season != '$season_exclude'
                UNION ALL
            SELECT sub_1 AS Player, first_name, surname, season 
                FROM results 
                INNER JOIN drfc_players ON results.sub_1 = drfc_players.player_id
                WHERE season != '$season_exclude'
                UNION ALL
            SELECT sub_2 AS Player, first_name, surname, season 
                FROM results 
                INNER JOIN drfc_players ON results.sub_2 = drfc_players.player_id
                WHERE season != '$season_exclude'
                UNION ALL
            SELECT sub_3 AS Player, first_name, surname, season 
                FROM results 
                INNER JOIN drfc_players ON results.sub_3 = drfc_players.player_id
                WHERE season != '$season_exclude'
        ) a
        GROUP BY Player, first_name, surname
        ORDER BY count DESC"
    );
    $stmt->execute();

    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $players_array[] = array (
            'Player'=>$row['Player'],
            'first_name'=>$row['first_name'],
            'surname'=>$row['surname'],
            'count'=>$row['count']
        );
    }
    echo '{"results":';
        echo json_encode($players_array);
    echo '}';
?>