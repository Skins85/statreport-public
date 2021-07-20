<?php
    header('Content-Type: application/json');
    
    include '../../config/db.php';
    $season_exclude = '';

        $stmt = $conn->prepare(
          "SELECT results.*, attendances.*, snippets.text AS attendance_note, teams.team_id, assists.*
            FROM results
            INNER JOIN teams ON results.team_home = teams.team_name
            INNER JOIN attendances ON results.match_id = attendances.match_id
            INNER JOIN assists ON results.match_id = assists.match_id
            LEFT OUTER JOIN snippets ON attendances.attendance_note = snippets.id
            WHERE team_id = 'dagenham-and-redbridge' AND season != '$season_exclude'
            UNION
          SELECT results.*, attendances.*, snippets.text AS attendance_note, teams.team_id, assists.*
            FROM results
            INNER JOIN teams ON results.team_away = teams.team_name
            INNER JOIN attendances ON results.match_id = attendances.match_id
            INNER JOIN assists ON results.match_id = assists.match_id
            LEFT OUTER JOIN snippets ON attendances.attendance_note = snippets.id
            WHERE team_id = 'dagenham-and-redbridge' AND season != '$season_exclude'
          ORDER BY date DESC"
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
                'player_1_subbed_minute'=>$row['player_1_subbed_minute'],
                'player_2_subbed_minute'=>$row['player_2_subbed_minute'],
                'player_3_subbed_minute'=>$row['player_3_subbed_minute'],
                'player_4_subbed_minute'=>$row['player_4_subbed_minute'],
                'player_5_subbed_minute'=>$row['player_5_subbed_minute'],
                'player_6_subbed_minute'=>$row['player_6_subbed_minute'],
                'player_7_subbed_minute'=>$row['player_7_subbed_minute'],
                'player_8_subbed_minute'=>$row['player_8_subbed_minute'],
                'player_9_subbed_minute'=>$row['player_9_subbed_minute'],
                'player_10_subbed_minute'=>$row['player_10_subbed_minute'],
                'player_11_subbed_minute'=>$row['player_11_subbed_minute'],
                'sub_1'=>$row['sub_1'],
                'sub_2'=>$row['sub_2'],
                'sub_3'=>$row['sub_3'],
                'sub_4'=>$row['sub_4'],
                'sub_5'=>$row['sub_5'],
                'sub_1_minute'=>$row['sub_1_minute'],
                'sub_2_minute'=>$row['sub_2_minute'],
                'sub_3_minute'=>$row['sub_3_minute'],
                'sub_4_minute'=>$row['sub_4_minute'],
                'sub_5_minute'=>$row['sub_5_minute'],
                'attendance'=>$row['attendance_total'],
                'attendance_away'=>$row['attendance_away'],
                'attendance_note'=>$row['attendance_note'],
                'attendance_calc_exclude'=>$row['attendance_calc_exclude'],
                'league_position'=>$row['league_position'],
                'referee'=>$row['referee']
            );
        }
        echo '{"results":';
          echo json_encode($results_array);
        echo '}';
?>