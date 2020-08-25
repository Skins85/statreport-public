<?php
    header('Content-Type: application/json');

    include '../../config/db.php';

        $stmt = $conn->prepare(
          'SELECT `team_id`, `team_name` FROM `teams`'
        );
        $stmt->execute();

        while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $teams_array[] = array (
                'team_id'=>$row['team_id'],
                'team_name'=>$row['team_name']
            );
        }
        echo '{"results":';
          echo json_encode($teams_array);
        echo '}';
?>