import React, { useEffect, useState } from 'react';
import { arrayInstancesToObject, filterArrayofObjects, nameFormat, objectInstancesToArray, toggleState } from '../../util';
import { configure, mount, shallow } from 'enzyme';

import Banner from '../banner/banner';
import Result from '../result/result';
import ResultsSummary from '../result/result-summary';
import SeasonOptions from '../form/options/season';
import Select from '../form/ui/select/select';
import Spinner from '../ui/spinner/spinner';
import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';

export default function Teams(props) {
    const [hasError, setErrors] = useState(false);
    const [teamsData, setTeamsData] = useState({});
    const [homeMatchesData, sethomeMatchesData] = useState({});
    const [awayMatchesData, setawayMatchesData] = useState({});
    const [goalsData, setGoalsData] = useState({});
    const [allScorersShow, setAllScorersShow] = useState(false);
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

            await api({
                url: 'https://www.statreport.co.uk/api/json/data-players-goals-all.php',
                method: 'get'
            }).then(async (response) => {
                setGoalsData(response.data);
            })

            await setDataLoaded(true);
 
        }
        fetchData();
    },[]);

    // let toggleAllScorersHandler = e => {
    //     setAllScorersShow(!allScorersShow);
    //     e.target.innerText === `Show all goalscorers` 
    //         ? e.target.innerText = `Hide all goalscorers`
    //         : e.target.innerText = `Show all goalscorers`;
    // }
    let toggleAllScorersHandler = (e) => {
        toggleState(e, setAllScorersShow, allScorersShow, 'Hide all goalscorers', 'Show all goalscorers')
    };

    // Variables
    let teamsTemplate,
        teamsWrapper,
        teamsArray = [],
        teams = teamsData.results,
        homeMatches = homeMatchesData.results,
        awayMatches = awayMatchesData.results,
        goals = goalsData.results,
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
        largestAwayWinTemplate,
        largestAwayLossTemplate,
        scorers = goalsData.results,
        scorersByOpponent,
        scorersByOpponentAll = [],
        allScorersTemplate = [],
        topScorersTemplate = [],
        allScorersList,
        topScorersList,
        playerGoalCount = {},
        uniqueGoalTotals,
        test;
    
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

                if (scorers) {
                    scorersByOpponent = scorers.filter(function(result) {
                        return (
                            result.match_id === m.match_id
                        )
                    });
                }
                scorersByOpponentAll.push(scorersByOpponent);

                if (m.goals_home === m.goals_away) {
                    draws += 1;
                } else if (m.team_home === 'Dagenham & Redbridge' && m.goals_home > m.goals_away || m.team_away == 'Dagenham & Redbridge' && m.goals_away > m.goals_home) {
                    wins += 1;
                } else if (m.team_home === 'Dagenham & Redbridge' && m.goals_home < m.goals_away || m.team_away == 'Dagenham & Redbridge' && m.goals_away < m.goals_home) {
                    losses += 1;
                }
            }
            
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
                        m.awayWinMargin = m.goals_away - m.goals_home;
                        awayWinMargins.push(m.awayWinMargin);
                    } else if (m.goals_away < m.goals_home) {
                        awayLosses += 1;
                        m.awayLossMargin = m.goals_home - m.goals_away;
                        awayLossMargins.push(m.awayLossMargin)
                    }
                }
            }
            
            // Get largest wins/defeat margins
            homeWinLargest = Math.max.apply( null, homeWinMargins );
            homeLossLargest = Math.max.apply( null, homeLossMargins );
            awayWinLargest = Math.max.apply( null, awayWinMargins );
            awayLossLargest = Math.max.apply( null, awayLossMargins );

            let allScorersArray;
            if (scorersByOpponentAll) {

                // Flatten scorers arrays into one array to enable count by scorer ID
                allScorersArray = Array.prototype.concat.apply([], scorersByOpponentAll);

                // Array of scorer IDs, e.g. ["balanta-angelo", "balanta-angelo", "wilkinson-conor"]
                let scorersArray = [];
                if (scorersByOpponentAll[0] !== undefined) {
                    for (const s of allScorersArray) {
                        scorersArray.push(s.scorer_id)
                    }
                    
                    // Create object for scorers, e.g. { balanta_angelo: 2, wilkinson_conor: 3 }
                    arrayInstancesToObject(scorersArray, playerGoalCount);
                
                    // Convert goalscorer totals objects into array and sort by descending
                    // e.g. { balanta_angelo: 2, wilkinson_conor: 3, ... }
                    // Result => 0: (2) ["wilkinson_conor", 3]
                    //           1: (2) ["balanta_angelo", 2]
                    let orderedScorersArray = [];
                    objectInstancesToArray(playerGoalCount, orderedScorersArray, 'desc');

                    // Extract win/loss margins into numeric array
                    let goalTotals = [];
                    for (const o of orderedScorersArray) {
                        goalTotals.push(o[1])
                    }
                    // Reduce array of goal totals to unique values, e.g. [5,4,2]
                    uniqueGoalTotals = [...new Set(goalTotals)];
                    
                    // Customise top scorer display based on number of unique goal total values 
                    switch (true) {
                        case (uniqueGoalTotals.length >=4):
                            goalTotals = uniqueGoalTotals[2]
                            break;
                        case (uniqueGoalTotals.length === 3):
                            goalTotals = uniqueGoalTotals[1]
                            break;
                        case (uniqueGoalTotals.length === 2):
                            goalTotals = uniqueGoalTotals[0];
                            // setAllScorersShow(true);
                            break;
                        default: 
                            goalTotals = uniqueGoalTotals[0]
                            // setAllScorersShow(true);
                    }
                    
                    for (const o of orderedScorersArray) {
                        
                        // Always build all goalscorers' totals list
                        allScorersList = goals.filter((result) => result.scorer_id === o[0] );
                        allScorersTemplate.push(<p><a href={`../players/${allScorersList[0]['scorer_id']}`}>{allScorersList[0]['first_name']} {allScorersList[0]['surname']}</a> {o[1]}</p>);

                        // Display top scorers list depending on number of different goal values exist (see switch statement)
                        (o[1] >= goalTotals ? topScorersList = goals.filter((result) => result.scorer_id === o[0]) : topScorersList = '');
                        topScorersList ? topScorersTemplate.push(
                            <p>
                                <a href={`../players/${topScorersList[0]['scorer_id']}`}>
                                    {topScorersList[0]['first_name']} {topScorersList[0]['surname']}
                                </a>&nbsp;
                                {o[1]}
                            </p>
                        ) : topScorersList = '';                        
                    }
                }                
            }
           
            // Filter match data and create an array of objects containing match data for largest margins
            let largestHomeWins = filterArrayofObjects(homeMatches, 'homeWinMargin', homeWinLargest),
                largestHomeLosses = filterArrayofObjects(homeMatches, 'homeLossMargin', homeLossLargest),
                largestAwayWins = filterArrayofObjects(awayMatches, 'awayWinMargin', awayWinLargest),
                largestAwayLosses = filterArrayofObjects(awayMatches, 'awayLossMargin', awayLossLargest);

            /**
             * JSX for largest wins/defeats margins
             *
             * @param {Array of Objects} arr - The data associated with the largest margin.
             **/
            function largestMargins(arr, type) {
                if (arr.length > 0) {
                    let res = arr.map(key => {
                        return (
                            <p className={`record__margins__outcome record__margins__outcome--${type}`}>{nameFormat(key.team_home)}&nbsp;
                                <a href={`../matches/?m=${key.match_id}`}>
                                {key.goals_home}-{key.goals_away}
                                </a>&nbsp;
                                {nameFormat(key.team_away)}
                            </p>
                        )
                    });
                    return res;
                }
            }

            largestHomeWinTemplate = largestMargins(largestHomeWins, 'win');
            largestHomeLossTemplate = largestMargins(largestHomeLosses, 'loss');
            largestAwayWinTemplate = largestMargins(largestAwayWins, 'win');
            largestAwayLossTemplate = largestMargins(largestAwayLosses, 'loss')
                
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
            <div className='wrapper--content__inpage'>
                <div className='content__inpage content__inpage--standard'>
                    <h1
                        title={ dataLoaded ? 'data' : 'no-data' }
                    >Teams</h1>
                    {test}
                    
                    {topScorersList === '' ? <React.Fragment><h3>Top scorers</h3>{topScorersTemplate}<button className='toggle toggle--closed' onClick={toggleAllScorersHandler}>Show all goalscorers</button></React.Fragment> : <React.Fragment><h3>All scorers</h3>{allScorersTemplate}</React.Fragment>}
                    {allScorersShow ? <React.Fragment><h3>All scorers</h3>{allScorersTemplate}</React.Fragment> : null}
                    
                    
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
                        <h2>Record wins/losses</h2>
                        <div className='wrapper--record__margins width--75'>
                            <div className='record__margins record__margins--home'>
                                <img 
                                    src='../images/icons/house-32-freepik.png' 
                                    alt='House icon' 
                                />
                                <div>
                                    {largestHomeWinTemplate ? largestHomeWinTemplate : <p className='record__margins__outcome record__margins__outcome--win'>No recorded home wins</p>}
                                    {largestHomeLossTemplate ? largestHomeLossTemplate : <p className='record__margins__outcome record__margins__outcome--loss'>No recorded home losses</p>}
                                </div>
                            </div>
                            <div className='record__margins record__margins--away'>
                                <img 
                                    src='../images/icons/road-32-freepik.png' 
                                    alt='Road icon' 
                                />
                                {largestAwayWinTemplate ? largestAwayWinTemplate : <p className='record__margins__outcome record__margins__outcome--win'>No recorded away wins</p>}
                                {largestAwayLossTemplate ? largestAwayLossTemplate : <p className='record__margins__outcome record__margins__outcome--loss'>No recorded away losses</p>}
                            </div>
                        </div>
                        <p>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}