<?php
    header('Content-Type: application/json');

    include '../../config/db.php';

        $stmt = $conn->prepare(
          "SELECT 
                `match_id`, 
                `season`, 
                `date`, 
                `team_home`, 
                `team_away`, 
                `competition`, 
                `attendance`,
                `home_goals`,
                `away_goals`
            FROM `results`
            WHERE `competition` = 'League' AND `team_home` = 'Dagenham & Redbridge' ORDER BY `date`"
        );
        $stmt->execute();

        while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $attendances_array[] = array (
                'match_id'=>$row['match_id'],
                'date'=>$row['date'],
                'season'=>$row['season'],
                'team_home'=>$row['team_home'],
                'goals_home'=>$row['home_goals'],
                'goals_away'=>$row['away_goals'],
                'team_away'=>$row['team_away'],
                'competition'=>$row['competition'],
                'attendance'=>$row['attendance']
            );
        }
        echo '{"results":';
          echo json_encode($attendances_array);
        echo '}';
?>