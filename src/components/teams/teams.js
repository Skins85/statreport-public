import { CSSTransition, TransitionGroup } from 'react-transition-group';
import React, { useEffect, useState } from 'react';
import { arrayInstancesToObject, filterArrayofObjects, nameFormat, objectInstancesToArray, toggleState } from '../../util';
import { configure, mount, shallow } from 'enzyme';

import Banner from '../banner/banner';
import BannerImg from '../../images/banner/football-field-alfredo-camacho.jpg';
import IconArrowUp from '../../images/icons/arrow-up-freepik-1.png';
import IconArrowUpDown from '../../images/icons/up-down-arrow-freepik.png';
import IconFootball from '../../images/icons/football-freepik.png';
import IconFootballPitch from '../../images/icons/football-pitch-freepik.png';
import IconHouse from '../../images/icons/house-32-freepik.png';
import IconRoad from '../../images/icons/road-32-freepik.png';
import IconSpectators from '../../images/icons/crowd-freepik-1.png';
import IconTextDocument from '../../images/icons/text-document-freepik.png';
import Input from '../../components/form/ui/input/input';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import Result from '../result/result';
import ResultsSummary from '../result/result-summary';
import SeasonOptions from '../form/options/season';
import Select from '../form/ui/select/select';
import Spinner from '../ui/spinner/spinner';
import Table from '../../components/hoc/table/table';
import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';

export default function Teams(props) {
    const [hasError, setErrors] = useState(false);
    const [teamsData, setTeamsData] = useState({});
    const [homeMatchesData, sethomeMatchesData] = useState({});
    const [awayMatchesData, setawayMatchesData] = useState({});
    const [allMatchesData, setAllMatchesData] = useState({});
    const [goalsData, setGoalsData] = useState({});
    const [allScorersShow, setAllScorersShow] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [matchDisplayNumber, setMatchDisplayNumber] = useState(3);
    const [teamSearchText, setTeamSearchText] = useState({});

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
                url: 'https://www.statreport.co.uk/api/json/data-matches.php',
                method: 'get'
            }).then(async (response) => {
                setAllMatchesData(response.data);
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
        otherScorersTemplate = [],
        allScorersList,
        topScorersList,
        otherScorersList,
        playerGoalCount = {},
        uniqueGoalTotals,
        opponent = 'Teams',
        firstMatchDate,
        homeAttendancesArray = [],
        attendancesTemplate,
        test;

    // Change the number of results that are visible in the results table
    let matchNumberHandler = e => {
        e.target.value === 'all' ? setMatchDisplayNumber((filteredTeam.length + 1)) : setMatchDisplayNumber(e.target.value);
    }

    // If teams data returned
    if (teams) {
        // TDD test
        // teamsWrapper = <div title='teams-index'>test</div>;

        // Filter teams data to exclude Dagenham & Redbridge
        teams = teams.filter((result) => result.team_id !== 'dagenham-and-redbridge' );
        
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
            firstMatchDate = filteredTeam[filteredTeam.length -1]['date'];

            // Get opponent full name
            filteredTeam[0].team_home === 'Dagenham & Redbridge' ? opponent = filteredTeam[0].team_away : opponent = filteredTeam[0].team_home;

            // Results template
            resultsTable = filteredTeam.slice(0,matchDisplayNumber).map(key => 
                <Result
                    id={key.match_id}
                    match_id={key.match_id}
                    date={key.date}
                    team_home={key.team_home}
                    team_away={key.team_away}
                    goals_home={key.goals_home}
                    goals_away={key.goals_away}
                    competition={key.competition}
                    link_enabled
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
                    homeAttendancesArray.push(parseInt(m.attendance));
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
            
            // Sort attendances and build template
            homeAttendancesArray = homeAttendancesArray.sort((a, b) => b - a);
            
            let highestAttendanceMatch, lowestAttendanceMatch;
            if (filteredTeam) {
                highestAttendanceMatch = filteredTeam.filter(function(result) {
                    return (
                        parseInt(result.attendance) === homeAttendancesArray[0] &&
                        result.team_home === 'Dagenham & Redbridge'
                    )
                });
                lowestAttendanceMatch = filteredTeam.filter(function(result) {
                    return (
                        parseInt(result.attendance) === homeAttendancesArray[homeAttendancesArray.length -1] &&
                        result.team_home === 'Dagenham & Redbridge'
                    )
                });
            }
            
            if (homeAttendancesArray.length > 0) {
                attendancesTemplate =
                <React.Fragment>
                    <p>{nameFormat('Dagenham & Redbridge')} have an average attendance of {Math.ceil(homeAttendancesArray.reduce((a, b) => a + b, 0) / homeAttendancesArray.length).toLocaleString()} against {opponent}.</p>
                    <div className='wrapper--icon'>
                        <img 
                            src={IconArrowUp}
                            alt='Up arrow icon'
                            className='icon arrow'
                        />
                        <h3>Highest</h3>
                    </div>
                    <Table>
                        <Result
                            id={highestAttendanceMatch[0] ? highestAttendanceMatch[0]['match_id'] : null}
                            match_id={highestAttendanceMatch[0] ? highestAttendanceMatch[0]['match_id'] : null}
                            date={highestAttendanceMatch[0] ? highestAttendanceMatch[0].date : null}
                            team_home={'Dagenham & Redbridge'}
                            team_away={opponent}
                            goals_home={highestAttendanceMatch[0] ? highestAttendanceMatch[0]['goals_home'] : null}
                            goals_away={highestAttendanceMatch[0] ? highestAttendanceMatch[0]['goals_away'] : null}
                            competition={highestAttendanceMatch[0] ? highestAttendanceMatch[0]['competition'] : null}
                            attendance={highestAttendanceMatch[0] ? highestAttendanceMatch[0]['attendance'] : null}
                            link_enabled
                        />
                    </Table>

                    <div className='wrapper--icon'>
                        <img 
                            src={IconArrowUp}
                            alt='Up arrow icon'
                            className='icon arrow inverse'
                        />
                        <h3>Lowest</h3>
                    </div>
                    <Table>
                        <Result
                            id={lowestAttendanceMatch[0]['match_id']}
                            match_id={lowestAttendanceMatch[0]['match_id']}
                            date={lowestAttendanceMatch[0].date}
                            team_home={'Dagenham & Redbridge'}
                            team_away={opponent}
                            goals_home={lowestAttendanceMatch[0]['goals_home']}
                            goals_away={lowestAttendanceMatch[0]['goals_away']}
                            competition={lowestAttendanceMatch[0]['competition']}
                            attendance={lowestAttendanceMatch[0]['attendance']}
                            link_enabled
                        />
                    </Table>
                </React.Fragment>
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
                            allScorersTemplate.push(<p>{o[1]} <Link to={`../players/${allScorersList[0]['scorer_id']}`}>{allScorersList[0]['first_name']} {allScorersList[0]['surname']}</Link></p>);

                            // Display top scorers list depending on number of different goal values exist (see switch statement)
                            (o[1] >= goalTotals ? topScorersList = goals.filter((result) => result.scorer_id === o[0]) : topScorersList = '');
                            topScorersList ? topScorersTemplate.push(
                                <p>
                                    {o[1]}&nbsp;
                                    <Link to={`../players/${topScorersList[0]['scorer_id']}`}>
                                        {topScorersList[0]['first_name']} {topScorersList[0]['surname']}
                                    </Link>
                                </p>
                            ) : topScorersList = '';

                            // Display other scorers, i.e. non-top scorers
                            (o[1] < goalTotals ? otherScorersList = goals.filter((result) => result.scorer_id === o[0]) : otherScorersList = '');
                            if (otherScorersList) {
                                otherScorersTemplate.push(
                                    <TransitionGroup>
                                        <CSSTransition
                                            appear={allScorersShow}
                                            timeout={1000}
                                            classNames='fade'
                                        >
                                        <p>
                                            {o[1]}&nbsp;
                                            <Link to={`../players/${otherScorersList[0]['scorer_id']}`}>
                                                {otherScorersList[0]['first_name']} {otherScorersList[0]['surname']}
                                            </Link>
                                        </p>
                                        </CSSTransition>
                                    </TransitionGroup>
                                )
                            }
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
                                    <Link to={`../matches/?m=${key.match_id}`}>
                                        {key.goals_home}-{key.goals_away}
                                    </Link>&nbsp;
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
                teamsTemplate = teams.map(t => <p><Link to={`teams/${t.team_id}`}>{t.team_name}</Link></p>);   
            } // End check if team selected

        } // End if teams data returned

        // Document title here, so can change depending on data
        document.title = `Teams | StatReport`;

        if (teamId !== 'teams') {
            document.title = `${nameFormat('Dagenham & Redbridge')} record against ${opponent} | StatReport`;

            if (dataLoaded) {
            return (
                <React.Fragment>
                    <Banner
                        name='Teams'
                        description='Teams'
                        image={BannerImg}
                        // Banner image: Photo by <a href="/photographer/alfcb-46394">Alfredo Camacho</a> from <a href="https://freepublic/images.com/">Freepublic/images</a>
                    />
                    <div className='wrapper--content__inpage teams-layout'>
                        <div className='teams content__inpage content__inpage'>
                            <h1
                                title={ dataLoaded ? 'data' : 'no-data' }
                            >{opponent}</h1>
                            <p className='standfirst'>Dagenham & Redbridge have played {opponent} {(wins + draws + losses) > 1 ? `${(wins + draws + losses)} times` : 'once'} since {Moment(firstMatchDate).format('DD/MM/YYYY')}, 
                            with a win ratio of {Math.round(wins / (wins + draws + losses) * 100)}%.</p>
                            <section id='section--results'>
                                <div className='wrapper--icon'>
                                    <img 
                                        src={IconTextDocument}
                                        alt='Spreadsheet icon'
                                        className='icon'
                                    />
                                    <h2>Results</h2>
                                </div>
                                <p>Summary of overall record against {opponent}.</p>
                                <Table 
                                    className='text-align--right width--75'
                                    displayHeader
                                >
                                        <ResultsSummary
                                            className='text-align--right width--75'
                                            displayHeader
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
                                            class='total'
                                            label='Total'
                                            played={wins + draws + losses}
                                            wins={wins}
                                            draws={draws}
                                            losses={losses}
                                            goalsFor={homeGoalsFor + awayGoalsFor}
                                            goalsAgainst={homeGoalsAgainst + awayGoalsAgainst}
                                        />
                                </Table>
                            </section>
                            <section id='section--results'>
                                <div className='wrapper--icon'>
                                    <img 
                                        src={IconFootballPitch}
                                        alt='Football pitch icon'
                                        className='icon'
                                    />
                                    <h2>Matches</h2>
                                </div>
                                <p>Match outcomes and links to match reports.</p>
                                {filteredTeam.length > 3 ? <Select
                                    labelRequired
                                    labelText={`Matches to display`} 
                                    labelTarget={`matches-select`}
                                    selectId={`matches-select`}
                                    selectName={`matches-select`}
                                    onChange={matchNumberHandler}
                                >
                                    <option value="3" name="3">3</option>
                                    <option value="4" name="4">4</option>
                                    <option value="5" name="5">5</option>
                                    <option value="6" name="6">6</option>
                                    <option value="7" name="7">7</option>
                                    <option value="8" name="8">8</option>
                                    <option value="all" name="all">All</option>
                                </Select> : null }
                                <Table className='results width--75'>
                                    {resultsTable}
                                </Table>
                            </section>
                            
                            <section id='section--goalscorers-attendances'>
                                <div className='wrapper--goalscorers__attendances'>
                                    <div className='goalscorers'>
                                        <div className='wrapper--icon'>
                                            <img 
                                                src={IconFootball}
                                                alt='Goal icon'
                                                className='icon'
                                            />
                                            <h2>Goalscorers</h2>
                                        </div>
                                        {scorersByOpponentAll.length > 1 ? <p>A list of {nameFormat('Dagenham & Redbridge')} goalscorers against {opponent}.</p> : <p>No {nameFormat('Dagenham & Redbridge')} goalscorers against {opponent}.</p>}
                                            {/* Display top scorers and all scorers toggle depending on data received */}
                                            {topScorersList === '' ? <React.Fragment>{topScorersTemplate}</React.Fragment> : <React.Fragment>{allScorersTemplate}</React.Fragment>}
                                            {allScorersShow ? <React.Fragment>{otherScorersTemplate}</React.Fragment> : null}
                                            {topScorersList === '' ? <button className='toggle toggle--closed' onClick={toggleAllScorersHandler}>Show all goalscorers</button> : null }
                                            {/* {topScorersList === '' ? <button className='toggle toggle--closed' onClick={toggleAllScorersHandler}>Show all goalscorers</button> : null } */}
                                    </div>
                                    <div className='attendances'>
                                        <div className='wrapper--icon'>
                                            <img 
                                                src={IconSpectators}
                                                alt='Crowd icon icon'
                                                className='icon'
                                            />
                                            <h2>Attendances</h2>
                                        </div>                    
                                        
                                        {homeAttendancesArray.length > 0 ? attendancesTemplate : <p>No home matches against {opponent}.</p>}
                                    </div>
                                </div>
                            </section>
                                <div className='data-wrapper' title={`data-loaded-${dataLoaded}`}>
                                    {teamsTemplate}
                                    
                                    {teamsWrapper}
                                <div className='wrapper--icon'>
                                    <img 
                                        src={IconArrowUpDown}
                                        alt='Up/down arrow icon'
                                        className='icon'
                                    />
                                    <h2>Win/loss margins</h2>
                                </div>
                                <p>Largest margins of victory and defeat against {opponent} both at home and on the road.</p>
                                <div className='wrapper--record__margins'>
                                    <div className='record__margins record__margins--home'>
                                        <img 
                                            src={IconHouse}
                                            alt='House icon' 
                                        />
                                        <div>
                                            {largestHomeWinTemplate ? largestHomeWinTemplate : <p className='record__margins__outcome record__margins__outcome--win'>No recorded home wins</p>}
                                            {largestHomeLossTemplate ? largestHomeLossTemplate : <p className='record__margins__outcome record__margins__outcome--loss'>No recorded home losses</p>}
                                        </div>
                                    </div>
                                    <div className='record__margins record__margins--away'>
                                        <img 
                                            src={IconRoad} 
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
                    {test}

                </React.Fragment>
            )
        } else { // Team-specific URL, but data not loaded yet; show spinner
            return (
                <Spinner />
            )
        }
    } else { // Not team-specific URL; display team index
        if (dataLoaded) {

            if (teams) {

                // Create array of unique team objects
                let teamsObjAllArr = [];
                for (const h of homeMatches) {
                    teamsObjAllArr.push({
                        team_id: h.opponent_id,
                        team_name: h.team_away,
                    });
                } 
                for (const h of awayMatches) {
                    teamsObjAllArr.push({
                        team_id: h.opponent_id,
                        team_name: h.team_home,
                    });
                }
                const uniqueTeams = Array.from(new Set(teamsObjAllArr.map(a => a.team_id)))
                    .map(id => {
                        return teamsObjAllArr.find(a => a.team_id === id)
                }) 

                // Filter results based on search input
                let filteredTeamResults = uniqueTeams.filter(
                    (name) => {
                        return name.team_name.toLowerCase().indexOf(teamSearchText) !== -1
                    }
                )

                if (teamSearchText.length > 0) {
                    if (filteredTeamResults.length > 0) {
                        teamsTemplate = filteredTeamResults.map(p => 
                            <p key={`${p.team_id}`}>
                                <Link to={`../teams/${p.team_id}`}>{p.team_name}</Link>
                            </p>
                        )
                    } else {
                        teamsTemplate = <p>No results were returned. Please enter another search term.</p>
                    }
                }
            }

            return (
                <React.Fragment>
                    <Banner
                        name='Teams'
                        description='Teams'
                        image={BannerImg}
                        // Banner image: Photo by <a href="/photographer/alfcb-46394">Alfredo Camacho</a> from <a href="https://freepublic/images.com/">Freepublic/images</a>
                    />
                    <div className='wrapper--content__inpage teams-layout'>
                        <div className='teams content__inpage content__inpage'>
                            <p className='standfirst'>Find out {nameFormat('Dagenham & Redbridge')}'s record against teams over the years, including biggest win/loss margins and highest scorers.</p>
                            <div className='wrapper--input'>
                                <Input 
                                    inputType={`text`} 
                                    placeholderText={`Search for teams`} 
                                    inputId={`search-teams`} 
                                    inputName={`search-teams`}
                                    onChange={(event) => setTeamSearchText(event.target.value)} 
                                />
                            </div>
                            {teamsTemplate}
                        </div>
                    </div>
                </React.Fragment>
            )
        } else { // Data not yet loaded; display spinner
            return (
                <Spinner />
            )
        }
        
    }
}