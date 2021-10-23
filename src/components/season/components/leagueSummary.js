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
        homeGoalsForTotal = 0,
        homeGoalsAgainstTotal = 0,
        awayWins = 0,
        awayDraws = 0,
        awayDefeats = 0,
        awayGoalsFor = 0,
        awayGoalsAgainst = 0,
        awayGoalsForTotal = 0,
        awayGoalsAgainstTotal = 0;

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
                homeGoalsForTotal += parseInt(x.goals_home);
                homeGoalsAgainstTotal += parseInt(x.goals_away);
                
            } else {
                x.goals_home < x.goals_away ? awayWins += 1 : null;
                x.goals_home > x.goals_away ? awayDefeats += 1 : null;
                x.goals_home === x.goals_away ? awayDraws += 1 : null;
                awayGoalsFor += parseInt(x.goals_away);
                awayGoalsAgainst += parseInt(x.goals_home);
                awayGoalsForTotal += parseInt(x.goals_away);
                awayGoalsAgainstTotal += parseInt(x.goals_home);
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
            <p><strong>Position: {`${ordinal(parseInt(leaguePosition))}`}</strong></p>
            <Table className='align-center table-layout-fixed'>
                <thead>
                    <tr>
                        <th 
                            colspan='5'
                            className='align-center'
                            location='home--primary'
                        >Home
                        </th>
                        <th 
                            colspan='5'
                            className='align-center'
                            location='away--primary'
                        >Away</th>
                        <th 
                            colspan='5'
                            className='align-center'
                            location='all--primary'
                        >Total</th>
                    </tr>
                    <tr>
                        <th location='home--secondary'>W</th>
                        <th location='home--secondary'>D</th>
                        <th location='home--secondary'>L</th>
                        <th location='home--secondary'>F</th>
                        <th location='home--secondary'>A</th>
                        <th location='away--secondary'>W</th>
                        <th location='away--secondary'>D</th>
                        <th location='away--secondary'>L</th>
                        <th location='away--secondary'>F</th>
                        <th location='away--secondary'>A</th>
                        <th location='all--secondary'>W</th>
                        <th location='all--secondary'>D</th>
                        <th location='all--secondary'>L</th>
                        <th location='all--secondary'>F</th>
                        <th location='all--secondary'>A</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <LeagueOutcomes
                            wins={homeWins}
                            draws={homeDraws}
                            defeats={homeDefeats}
                            goalsFor={homeGoalsForTotal}
                            goalsAgainst={homeGoalsAgainstTotal}
                        />
                        <LeagueOutcomes
                            wins={awayWins}
                            draws={awayDraws}
                            defeats={awayDefeats}
                            goalsFor={awayGoalsForTotal}
                            goalsAgainst={awayGoalsAgainstTotal}
                        />
                        <LeagueOutcomes
                            wins={homeWins + awayWins}
                            draws={homeDraws + awayDraws}
                            defeats={homeDefeats + awayDefeats}
                            goalsFor={homeGoalsForTotal + awayGoalsForTotal}
                            goalsAgainst={homeGoalsAgainstTotal + awayGoalsAgainstTotal}
                        />
                    </tr>
                </tbody>
            </Table>
        </>
    )
}
