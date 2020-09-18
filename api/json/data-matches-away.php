<?php
    header('Content-Type: application/json');
    
    include '../../config/db.php';

        $stmt = $conn->prepare(
          "SELECT * FROM results
          INNER JOIN teams 
          ON results.team_home = teams.team_name
          WHERE team_id != 'dagenham-and-redbridge'
          ORDER BY season DESC"
        );
        $stmt->execute();

        while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $results_array[] = array (
                'match_id'=>$row['match_id'],
                'date'=>$row['date'],
                'season'=>$row['season'],
                'team_home'=>$row['team_home'],
                'goals_home'=>$row['home_goals'],
                'goals_away'=>$row['away_goals'],
                'team_away'=>$row['team_away'],
                'opponent_id'=>$row['team_id'],
                'competition'=>$row['competition'],
                'step_opponent'=>$row['step_opponent'],
                'player_1'=>$row['player_1'],
                'player_2'=>$row['player_2'],
                'player_3'=>$row['player_3'],
                'player_4'=>$row['player_4'],
                'player_5'=>$row['player_5'],
                'player_6'=>$row['player_6'],
                'player_7'=>$row['player_7'],
                'player_8'=>$row['player_8'],
                'player_9'=>$row['player_9'],
                'player_10'=>$row['player_10'],
                'player_11'=>$row['player_11'],
                'sub_1'=>$row['sub_1'],
                'sub_2'=>$row['sub_2'],
                'sub_3'=>$row['sub_3'],
                'sub_4'=>$row['sub_4'],
                'sub_5'=>$row['sub_5'],
                'attendance'=>$row['attendance'],
                'attendance_away'=>$row['attendance_away'],
                'league_position'=>$row['league_position'],
                'referee'=>$row['referee']
            );
        }
        echo '{"results":';
          echo json_encode($results_array);
        echo '}';
?>