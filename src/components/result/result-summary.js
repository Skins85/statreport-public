import React from 'react';

const resultsSummary = (props) => {
    let wins = 0,
        draws = 0,
        losses = 0,
        goalsFor = 0,
        goalsAgainst = 0,
        goalDifference,
        leaguePosition = [];

        if (props.data) {
            // console.log(props.data)
            for (const m of props.data) {
                leaguePosition.push(m.league_position);
                
                if (m.team_home === 'Dagenham & Redbridge') {
                    
                    // Outcome
                    if (m.goals_home > m.goals_away) {
                        wins += 1;
                    } else if (m.goals_home < m.goals_away) {
                        losses += 1;
                    } else {
                        draws += 1;
                    }

                    // Goals
                    goalsFor += parseInt(m.goals_home);
                    goalsAgainst += parseInt(m.goals_away);

                } else if (m.team_away === 'Dagenham & Redbridge') {
                    
                    // Outcome
                    if (m.goals_home < m.goals_away) {
                        wins += 1;
                    } else if (m.goals_home > m.goals_away) {
                        losses += 1;
                    } else {
                        draws += 1;
                    }

                    // Goals
                    goalsFor += parseInt(m.goals_away);
                    goalsAgainst += parseInt(m.goals_home);
                }
            }
        }
    
    return (
        <tr 
            key={props.id}
            className={props.class}
        >
            {props.label ? <td>{props.label}</td> : null}
            {props.displayPosition ? <td>{leaguePosition.pop()}</td> : null}
            <td>{props.played ? props.played : props.data.length}</td>
            <td>{props.wins ? props.wins : wins}</td>
            <td>{props.draws ? props.draws : draws}</td>
            <td>{props.losses ? props.losses : losses}</td>
            <td>{props.goalsFor ? props.goalsFor : goalsFor}</td>
            <td>{props.goalsAgainst ? props.goalsAgainst : goalsAgainst}</td>
            {props.goalDifference ? <td>{props.goalDifference}</td> : <td>{goalsFor-goalsAgainst}</td>}
        </tr>
    )
}

export default resultsSummary;