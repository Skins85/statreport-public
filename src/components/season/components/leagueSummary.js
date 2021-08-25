import LeagueOutcomes from './leagueOutcomes';
import React from 'react';
import Table from '../../../components/hoc/table/table';
import ordinal from 'ordinal';

export default function LeagueSummary(props) {

    let leaguePosition,
        homeWins = 0,
        homeDraws = 0,
        homeDefeats = 0,
        homeGoalsFor = 0,
        homeGoalsAgainst = 0,
        awayWins = 0,
        awayDraws = 0,
        awayDefeats = 0,
        awayGoalsFor = 0,
        awayGoalsAgainst = 0;

    /**
     * Keep a running count of values, e.g. wins, draws, etc.
     *
     * @param {Array} data - The array of matches data.
     * @param {String} location - Home or away.
     */
    function counter(data, location) {
        for (const x of data) {
            if (location === 'home') {
                x.goals_home > x.goals_away ? homeWins += 1 : null;
                x.goals_home < x.goals_away ? homeDefeats += 1 : null;
                x.goals_home === x.goals_away ? homeDraws += 1 : null;
                homeGoalsFor += parseInt(x.goals_home);
                homeGoalsAgainst += parseInt(x.goals_away);
            } else {
                x.goals_home < x.goals_away ? awayWins += 1 : null;
                x.goals_home > x.goals_away ? awayDefeats += 1 : null;
                x.goals_home === x.goals_away ? awayDraws += 1 : null;
                awayGoalsFor += parseInt(x.goals_away);
                awayGoalsAgainst += parseInt(x.goals_home);
            }
        }
    }

    if (props.data) {
        const filteredSeasonData = props.data.results.filter((d) => d.season === props.season && d.competition === 'League');
        leaguePosition = filteredSeasonData[0]['league_position'];

        const filteredSeasonDataHome = filteredSeasonData.filter((d) => d.team_home === 'Dagenham & Redbridge');
        const filteredSeasonDataAway = filteredSeasonData.filter((d) => d.team_away === 'Dagenham & Redbridge');

        counter(filteredSeasonDataHome, 'home');
        counter(filteredSeasonDataAway, 'away');        
    }
    
    return (
        <>
            <h2>League summary</h2>
            <p><strong>Final position: {`${ordinal(parseInt(leaguePosition))}`}</strong></p>
            <Table className='align-center table-layout-fixed'>
                <thead>
                    <tr>
                        <th 
                            colspan='3'
                            className='align-center'
                        >Home
                        </th>
                        <th 
                            colspan='3'
                            className='align-center'
                        >Away</th>
                        <th 
                            colspan='3'
                            className='align-center'
                        >Total</th>
                    </tr>
                    <tr>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <LeagueOutcomes
                            wins={homeWins}
                            draws={homeDraws}
                            defeats={homeDefeats}
                        />
                        <LeagueOutcomes
                            wins={awayWins}
                            draws={awayDraws}
                            defeats={awayDefeats}
                        />
                        <LeagueOutcomes
                            wins={homeWins + awayWins}
                            draws={homeDraws + awayDraws}
                            defeats={homeDefeats + awayDefeats}
                        />
                    </tr>
                </tbody>
            </Table>
        </>
    )
}
