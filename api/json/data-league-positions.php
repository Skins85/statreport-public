<?php
    header('Content-Type: application/json');

    include '../../config/db.php';

    $stmt = $conn->prepare(
        "SELECT 
            match_id, 
            season, 
            date, 
            team_home, 
            team_away, 
            competition, 
            league_position
        FROM results
        WHERE competition = 'League'
        ORDER BY date"
    );
    $stmt->execute();

    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $league_positions_array[] = array (
            'match_id'=>$row['match_id'],
            'season'=>$row['season'],
            'date'=>$row['date'],
            'team_home'=>$row['team_home'],
            'team_away'=>$row['team_away'],
            'competition'=>$row['competition'],
            'league_position'=>$row['league_position']
        );
    }
    echo '{"results":';
        echo json_encode($league_positions_array);
    echo '}';
    
?>