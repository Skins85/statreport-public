import React from 'react';

/**
 * Display results summary as a table.
 *
 * Mandatory => Played, won, drawn, lost, goals scored, goals conceded.
 * Optional  => Label, league position, goal difference, points.
 * 
 * @param {Object} - The object of league data for the season to date.
 **/
const resultsSummary = (props) => {
    let wins = 0,
        draws = 0,
        losses = 0,
        goalsFor = 0,
        goalsAgainst = 0,
        pointsTotal = 0,
        leaguePosition = [];

        if (props.data) {
            for (const m of props.data) {
                leaguePosition.push(m.league_position);
                
                if (m.team_home === 'Dagenham & Redbridge') {
                    
                    // Outcome
                    if (m.goals_home > m.goals_away) {
                        wins += 1;
                        pointsTotal += 3;
                    } else if (m.goals_home < m.goals_away) {
                        losses += 1;
                    } else {
                        draws += 1;
                        pointsTotal += 1;
                    }

                    // Goals
                    goalsFor += parseInt(m.goals_home);
                    goalsAgainst += parseInt(m.goals_away);

                } else if (m.team_away === 'Dagenham & Redbridge') {
                    
                    // Outcome
                    if (m.goals_home < m.goals_away) {
                        wins += 1;
                        pointsTotal += 3;
                    } else if (m.goals_home > m.goals_away) {
                        losses += 1;
                    } else {
                        draws += 1;
                        pointsTotal += 1;
                    }

                    // Goals
                    goalsFor += parseInt(m.goals_away);
                    goalsAgainst += parseInt(m.goals_home);
                }
            }
        }
    
    return (
        <React.Fragment>
            {props.displayHeader ? 
                <thead>
                    <tr>
                        {props.label ? <th /> : null}
                        {props.displayPosition ? <th>Pos</th> : null}
                        <th>P</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>F</th>
                        <th>A</th>
                        {props.displayGoalDifference ? <th>GD</th> : null}
                        {props.displayPoints ? <th>Pts</th> : null}
                    </tr>
                </thead>
                : null}
            <tbody>
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
                    {props.displayGoalDifference ? <td>{goalsFor - goalsAgainst}</td> : null}
                    {props.displayPoints ? <td>{pointsTotal}</td> : null}
                </tr>
            </tbody>
        </React.Fragment>
    )
}

export default resultsSummary;