<?php
    header('Content-Type: application/json');

    include '../../config/db.php';

        $stmt = $conn->prepare(
          'SELECT * FROM `snippets`'
        );
        $stmt->execute();

        while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $teams_array[] = array (
                'id'=>$row['id'],
                'snippet'=>$row['snippet']
            );
        }
        echo '{"results":';
          echo json_encode($teams_array);
        echo '}';
?>