import React, { useEffect, useState } from 'react';
import { configure, mount, shallow } from 'enzyme';

import Banner from '../banner/banner';
import Result from '../result/result';
import ResultsSummary from '../result/result-summary';
import SeasonOptions from '../form/options/season';
import Select from '../form/ui/select/select';
import Spinner from '../ui/spinner/spinner';
import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';

export default function Teams() {
    const [hasError, setErrors] = useState(false);
    const [teamsData, setTeamsData] = useState({});
    const [homeMatchesData, sethomeMatchesData] = useState({});
    const [awayMatchesData, setawayMatchesData] = useState({});
    const [totalGoalsData, setTotalGoalsData] = useState({});
    const [season, setSeason] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false);

    document.title = 'Teams';

    useEffect(() => {
        async function fetchData() {

            // Cache GET requests
            let cache;
            function cacheReq() {
                
                // Define cache adapter and manage properties
                cache = setupCache({
                maxAge: 15 * 60 * 1000
                })
            }
            await cacheReq(cache);

            // Create cache adapter instance
            const api = axios.create({
                adapter: cache.adapter
            })
            
            // Cache GET responses and save in state
            await api({
                url: 'https://www.statreport.co.uk/api/json/data-teams.php',
                method: 'get'
            }).then(async (response) => {
                setTeamsData(response.data);
            })

            await api({
                url: 'https://www.statreport.co.uk/api/json/data-matches-home.php',
                method: 'get'
            }).then(async (response) => {
                sethomeMatchesData(response.data);
            })

            await api({
                url: 'https://www.statreport.co.uk/api/json/data-matches-away.php',
                method: 'get'
            }).then(async (response) => {
                setawayMatchesData(response.data);
            })

            await setDataLoaded(true);
 
        }
        fetchData();
    },[]);

    let seasonChange = e => { 
        window.location.pathname = `/players/scorers/${e.target.value}`;
    }

    // Variables
    let teamsTemplate,
        teamsWrapper,
        teamsArray = [],
        teams = teamsData.results,
        homeMatches = homeMatchesData.results,
        awayMatches = awayMatchesData.results,
        allMatches = [],
        teamId = window.location.pathname.split("/").pop(),
        filteredTeam,
        resultsTable,
        resultsSummary,
        wins = 0,
        draws = 0,
        losses = 0,
        homeWins = 0,
        homeDraws = 0,
        homeLosses = 0,
        homeGoalsFor = 0,
        homeGoalsAgainst = 0,
        homeWinLargest,
        homeLossLargest,
        awayWins = 0,
        awayDraws = 0,
        awayLosses = 0,
        awayGoalsFor = 0,
        awayGoalsAgainst = 0,
        homeWinMargins = [],
        homeLossMargins = [],
        awayWinMargins = [],
        awayLossMargins = [],
        awayWinLargest,
        awayLossLargest,
        largestHomeWinTemplate,
        largestHomeLossTemplate,
        largestAwayWinemplate,
        largestAwayLossTemplate;
    
    // If teams data returned
    if (teams && teams) {
        // TDD test
        teamsWrapper = <div title='teams-index'>test</div>;

        // If team selected
        if (teamId !== 'teams' && homeMatchesData && awayMatches) {
            // Merge home and away matches
            allMatches = homeMatches.concat(awayMatches);
            
            // Filter unique team data based on team ID
            filteredTeam = allMatches.filter(function(result) {
                return (
                    result.opponent_id === teamId
                )
            });

            // Results template
            resultsTable = filteredTeam.map(key => 
                <Result
                    id={key.match_id}
                    match_id={key.match_id}
                    date={key.date}
                    team_home={key.team_home}
                    team_away={key.team_away}
                    goals_home={key.goals_home}
                    goals_away={key.goals_away}
                    competition={key.competition}
                />
            )

            // Results summary template
            for (const m of filteredTeam) {
                if (m.goals_home === m.goals_away) {
                    draws += 1;
                } else if (m.team_home === 'Dagenham & Redbridge' && m.goals_home > m.goals_away || m.team_away == 'Dagenham & Redbridge' && m.goals_away > m.goals_home) {
                    wins += 1;
                } else if (m.team_home === 'Dagenham & Redbridge' && m.goals_home < m.goals_away || m.team_away == 'Dagenham & Redbridge' && m.goals_away < m.goals_home) {
                    losses += 1;
                }
            }

            let homeWinMargins = [];

            for (const m of filteredTeam) {
                if (m.team_home === 'Dagenham & Redbridge') {
                    homeGoalsFor += parseInt(m.goals_home);
                    homeGoalsAgainst += parseInt(m.goals_away);
                    if (m.goals_home === m.goals_away) {
                        homeDraws += 1;
                    } else if (m.goals_home > m.goals_away) {
                        homeWins += 1;
                        m.homeWinMargin = m.goals_home - m.goals_away;
                        homeWinMargins.push(m.homeWinMargin);
                    } else if (m.goals_away > m.goals_home) {
                        homeLosses += 1;
                        m.homeLossMargin = m.goals_away - m.goals_home;
                        homeLossMargins.push(m.homeLossMargin)
                    }
                } else if (m.team_away === 'Dagenham & Redbridge') {
                    awayGoalsFor += parseInt(m.goals_away);
                    awayGoalsAgainst += parseInt(m.goals_home);
                    if (m.goals_home === m.goals_away) {
                        awayDraws += 1;
                    } else if (m.goals_away > m.goals_home) {
                        awayWins += 1;
                    } else if (m.goals_away < m.goals_home) {
                        awayLosses += 1;
                    }
                }
            }
            // Results summary template


            homeWinLargest = Math.max.apply( null, homeWinMargins );
            homeLossLargest = Math.max.apply( null, homeLossMargins );

            let largestHomeWins = allMatches.filter(function(result) {
                return (
                    result.homeWinMargin === homeWinLargest
                )
            });

            let largestHomeLosses = allMatches.filter(function(result) {
                return (
                    result.homeLossMargin === homeLossLargest
                )
            });
            
            function largestMargins(arr) {
                if (arr.length > 0) {
                    let res = arr.map(key => {
                        return (
                            <p>{key.team_home}&nbsp;
                                <a href={`../matches/?m=${key.match_id}`}>
                                {key.goals_home}-{key.goals_away}
                                </a>&nbsp;
                                {key.team_away}
                            </p>
                        )
                    });
                    return res;
                }
            }

            largestHomeWinTemplate = largestMargins(largestHomeWins);
            largestHomeLossTemplate = largestMargins(largestHomeLosses);

                
        } else { // Teams index
            teamsTemplate = teams.map(t => <p><a href={`teams/${t.team_id}`}>{t.team_name}</a></p>);   
        } // End check if team selected

    } // End if teams data returned

    return (
        <React.Fragment>
            <Banner
                name='Teams'
                description='Teams'
                image='/images/banner/football-field-alfredo-camacho.jpg'
                // Banner image: Photo by <a href="/photographer/alfcb-46394">Alfredo Camacho</a> from <a href="https://freeimages.com/">FreeImages</a>
            />
            <div className='content__inpage'>
                <h1
                    title={ dataLoaded ? 'data' : 'no-data' }
                >Teams</h1>
                <div className='data-wrapper' title={`data-loaded-${dataLoaded}`}>
                    {teamsTemplate}
                    <h2>Summary</h2>
                    <table className='text-align--right'>
                        <thead>
                            <tr>
                                <th />
                                <th>P</th>
                                <th>W</th>
                                <th>D</th>
                                <th>L</th>
                                <th>F</th>
                                <th>A</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ResultsSummary
                                label='Home'
                                played={homeWins + homeDraws + homeLosses}
                                wins={homeWins}
                                draws={homeDraws}
                                losses={homeLosses}
                                goalsFor={homeGoalsFor}
                                goalsAgainst={homeGoalsAgainst}
                            />
                            <ResultsSummary
                                label='Away'
                                played={awayWins + awayDraws + awayLosses}
                                wins={awayWins}
                                draws={awayDraws}
                                losses={awayLosses}
                                goalsFor={awayGoalsFor}
                                goalsAgainst={awayGoalsAgainst}
                            />
                            <ResultsSummary
                                label='Total'
                                played={wins + draws + losses}
                                wins={wins}
                                draws={draws}
                                losses={losses}
                                goalsFor={homeGoalsFor + homeGoalsAgainst}
                                goalsAgainst={homeGoalsAgainst + awayGoalsAgainst}
                            />
                        </tbody>
                    </table>
                    <h2>Results</h2>
                    <table>
                        {resultsTable}
                    </table>
                    {teamsWrapper}
                    <h2>Largest victories/defeats</h2>
                    {largestHomeWinTemplate}
                    {largestHomeLossTemplate}
                </div>
            </div>
        </React.Fragment>
    )
}