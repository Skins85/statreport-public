import React from 'react';

const resultsSummary = (props) => {
    let wins = 0,
        draws = 0,
        losses = 0;

        if (props.data) {
            for (const m of props.data) {
                if (m.goals_home === m.goals_away) {
                    draws += 1;
                } else if (m.team_home === 'Dagenham & Redbridge' && m.goals_home > m.goals_away || m.team_away === 'Dagenham & Redbridge' && m.goals_away > m.goals_home) {
                    wins += 1;
                } else if (m.team_home === 'Dagenham & Redbridge' && m.goals_home < m.goals_away || m.team_away === 'Dagenham & Redbridge' && m.goals_away < m.goals_home) {
                    losses += 1;
                }
            }
        }
    
    return (
        <tr 
            key={props.id}
            className={props.class}
        >
            <td>{props.label}</td>
            <td>{props.played}</td>
            <td>{props.wins ? props.wins : wins}</td>
            <td>{props.draws ? props.draws : draws}</td>
            <td>{props.losses ? props.losses : losses}</td>
            <td>{props.goalsFor}</td>
            <td>{props.goalsAgainst}</td>
        </tr>
    )
}

export default resultsSummary;