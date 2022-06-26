<?php
    header('Content-Type: application/json');

    include '../../config/db.php';
    $season_exclude = '2010-11';

        $stmt = $conn->prepare(
          "SELECT 
                results.match_id, 
                `season`, 
                `date`, 
                `team_home`, 
                `team_away`, 
                `competition`, 
                `home_goals`,
                `away_goals`,
                `attendance_total`,
                `attendance_away`,
                `attendance_calc_exclude`
            FROM 
                `results`
            INNER JOIN 
                `attendances` 
                ON results.match_id = attendances.match_id
            WHERE 
                `competition` = 'League' 
            AND 
                `team_home` = 'Dagenham & Redbridge' 
            AND
                `season` != '$season_exclude'
            AND
                `attendance_calc_exclude` = 0
            ORDER BY `date`"
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
                'attendance'=>$row['attendance_total']
            );
        }
        echo '{"results":';
          echo json_encode($attendances_array);
        echo '}';
?>