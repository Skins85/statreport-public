<?php
    header('Content-Type: application/json');

    include '../../config/db.php';

    $stmt = $conn->prepare(
        "SELECT match_scorers.match_id, results.season, opponent_goal_1_scorer AS surname, opponent_goal_1_minute AS goal_time 
        FROM match_scorers 
        INNER JOIN results ON match_scorers.match_id = results.match_id
        UNION ALL 
        SELECT match_scorers.match_id, results.season, opponent_goal_2_scorer AS surname, opponent_goal_2_minute AS goal_time 
        FROM match_scorers 
        INNER JOIN results ON match_scorers.match_id = results.match_id
        UNION ALL 
        SELECT match_scorers.match_id, results.season, opponent_goal_3_scorer AS surname, opponent_goal_3_minute AS goal_time 
        FROM match_scorers 
        INNER JOIN results ON match_scorers.match_id = results.match_id
        UNION ALL 
        SELECT match_scorers.match_id, results.season, opponent_goal_4_scorer AS surname, opponent_goal_4_minute AS goal_time 
        FROM match_scorers 
        INNER JOIN results ON match_scorers.match_id = results.match_id
        UNION ALL 
        SELECT match_scorers.match_id, results.season, opponent_goal_5_scorer AS surname, opponent_goal_5_minute AS goal_time 
        FROM match_scorers 
        INNER JOIN results ON match_scorers.match_id = results.match_id
        UNION ALL 
        SELECT match_scorers.match_id, results.season, opponent_goal_6_scorer AS surname, opponent_goal_6_minute AS goal_time 
        FROM match_scorers 
        INNER JOIN results ON match_scorers.match_id = results.match_id
        UNION ALL 
        SELECT match_scorers.match_id, results.season, opponent_goal_7_scorer AS surname, opponent_goal_7_minute AS goal_time 
        FROM match_scorers 
        INNER JOIN results ON match_scorers.match_id = results.match_id
        UNION ALL 
        SELECT match_scorers.match_id, results.season, opponent_goal_8_scorer AS surname, opponent_goal_8_minute AS goal_time 
        FROM match_scorers
        INNER JOIN results ON match_scorers.match_id = results.match_id
        ORDER BY `surname` DESC
        "
    );
    $stmt->execute();

    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $players_array[] = array (
            'match_id'=>$row['match_id'],
            'season'=>$row['season'],
            'surname'=>$row['surname'],
            'goal_time'=>$row['goal_time'],
        );
    }
    echo '{"results":';
        echo json_encode($players_array);
    echo '}';
?>