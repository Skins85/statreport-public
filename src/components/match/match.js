import React, { useEffect, useState } from "react";
import { dataLoaded, fetchAssistsData, fetchMatchesData, fetchOppositionGoalsData, fetchOppositionOwnGoalsData, fetchPlayersData, fetchPlayersGoalsData } from '../../../redux/actions/matchActions';
import { useDispatch, useSelector } from "react-redux";

import { Link } from 'react-router-dom';
import MatchGoals from './match-goals';
import MatchPlayer from './match-player';
import Moment from 'react-moment';
import Results from '../../page-layouts/results/results';
import ResultsSummary from '../result/result-summary';
import Spinner from '../ui/spinner/spinner';
import Table from '../hoc/table/table';
import axios from 'axios';
import { nameFormat } from '../../util';
import { setupCache } from 'axios-cache-adapter';

export default function Matches() {

    const state = useSelector(state => state);
    const dispatch = useDispatch();
    console.log(state);

    let location;
    
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
            function apiCall(path, dispatchMethod) {
                api({
                    url: path,
                    method: 'get'
                }).then(async (response) => {
                    dispatch(dispatchMethod(response.data));
                })
            }

            await apiCall('https://www.statreport.co.uk/api/json/data-matches.php', fetchMatchesData);
            await apiCall('https://www.statreport.co.uk/api/json/data-players.php', fetchPlayersData);
            await apiCall('https://www.statreport.co.uk/api/json/data-players-goals-all.php', fetchPlayersGoalsData);
            await apiCall('https://www.statreport.co.uk/api/json/data-scorers-own-goals.php', fetchOppositionOwnGoalsData);
            await apiCall('https://www.statreport.co.uk/api/json/data-scorers-opposition.php', fetchOppositionGoalsData);
            // await apiCall('https://www.statreport.co.uk/api/json/data-players-assists-all.php', fetchAssistsData);

            await api({
                url: 'https://www.statreport.co.uk/api/json/data-players-assists-all.php',
                method: 'get'
            }).then(async (response) => {
                dispatch(fetchAssistsData(response.data));
            })

            await dispatch(dataLoaded(true));
        }
        fetchData();
    },[]);

    let matches = (state.match.matchesData1 ? matches = state.match.matchesData1.results: null),
        players = (state.match.playersData ? players = state.match.playersData.results: null),
        scorers = (state.match.playersGoalsData ? scorers = state.match.playersGoalsData.results: null),
        assists = (state.match.assistsData ? assists = state.match.assistsData.results: null),
        ownGoals = (state.match.oppositionOwnGoalsData ? ownGoals = state.match.oppositionOwnGoalsData.results: null),
        oppScorers = (state.match.oppositionGoalsData ? oppScorers = state.match.oppositionGoalsData.results: null),
        search = window.location.search,
        params = new URLSearchParams(search),
        matchId = params.get('m'),
        filteredMatches,
        filteredMatchesSeason,
        filteredMatchesSeasonToDate = [],
        DR__filteredScorers,
        DR__filteredAssists,
        OPP__filteredOppScorers,
        player_1,
        player_2,
        player_3,
        player_4,
        player_5,
        player_6,
        player_7,
        player_8,
        player_9,
        player_10,
        player_11,
        player_1_subbed_minute,
        player_2_subbed_minute,
        player_3_subbed_minute,
        player_4_subbed_minute,
        player_5_subbed_minute,
        player_6_subbed_minute,
        player_7_subbed_minute,
        player_8_subbed_minute,
        player_9_subbed_minute,
        player_10_subbed_minute,
        player_11_subbed_minute,
        sub_1,
        sub_2,
        sub_3,
        sub_4,
        sub_1_entrance_minute,
        sub_2_entrance_minute,
        sub_3_entrance_minute,
        sub_4_entrance_minute,
        subbedPlayers = [],
        subbedOnPlayers = [],
        subbedOnPlayersCount = 0,
        m,
        DR__scorersGoalTimeArray = [],
        DR__assistsGoalTimeArray = [],
        OPP__scorersGoalTimeArray = [],
        DR__scorersArray = [],
        DR__assistsArray = [],
        OPP__ScorersArray = [];

    if (matches && scorers && assists && oppScorers && matchId) {

        // Get all scorers data; D&R scorers with own goals scorers
        scorers = scorers.concat(ownGoals);

        // Target match data
        filteredMatches = matches.filter((match) => match.match_id === matchId);
        m = filteredMatches[0]; 

        // If league match, get that season's league data and filter up to current game
        if (m.competition === 'League') {
            filteredMatchesSeason = matches.filter((match) => match.season === m.season && match.competition === 'League');
            let matchIdParts = m.match_id.split('-');
            let [matchNumber] = matchIdParts.slice(-1);
            let formattedMatchNumber = parseInt(matchNumber);

            // Reverse array and slice array data to capture data to that point in season
            filteredMatchesSeason.reverse().slice([0], [formattedMatchNumber]).map((item, i) => {
                filteredMatchesSeasonToDate.push(item);
            });
        }
        
        DR__filteredScorers = scorers.filter(function(match) {
            return (
                match.match_id === matchId
            )
        });

        DR__filteredAssists = assists.filter(function(match) {
            return (
                match.match_id === matchId
            )
        });

        OPP__filteredOppScorers = oppScorers.filter(function(match) {
            return (
                match.match_id === matchId
            )
        });

        /**
         * Print Dag & Red scorers with goal times.
         *
         * @param {Array of Objects} filteredScorersData - Initial Dag & Red scorers data.
         * @param {Array} scorerArrNames - Scorer names, e.g. ['Wilson', 'Wilson', 'Brundle']
         * @param {String} key - Object key to extract value, e.g. 'surname'.
         * @param {Array} timeArr - Array of Dag & Red scorers' data including goal times.
         * @param {Variable} outputTemplate - The variable the returned JSX is stored in.
         **/
        
        // Create array of subbed players
        for (const a of Object.entries(m)) {
            if (a[0].includes('subbed') && a[1] !== '0') {
                subbedPlayers.push(a);
            }
            for (let i=1; i<= 5; i++) {
                if (a[0].includes(`sub_${i}_minute`) && a[1] !== '0') {
                    subbedOnPlayers.push(a);
                }
            }
        }

        for (const s of subbedPlayers) {
            let playerSubbed = s[0].replace('_subbed_minute','');
            let playerSubbedEl = document.querySelector(`.${playerSubbed}`);
            if (playerSubbedEl) {
                playerSubbedEl.classList.add('player__subbed', 'player__subbed--off',);
            }
        } 

        for (const s of subbedOnPlayers) {
            let playerSubbedOn = s[0].replace('_minute','');
            let playerSubbedEl = document.querySelector(`.${playerSubbedOn}`);
            if (playerSubbedEl) {
                playerSubbedEl.classList.add('player__subbed', 'player__subbed--on',);
            }
        } 

        for (const s of subbedPlayers) {
            switch (s[0]) {
                case 'player_1_subbed_minute':
                    player_1_subbed_minute = s[1];
                    break;
                case 'player_2_subbed_minute':
                    player_2_subbed_minute = s[1];
                    break;
                case 'player_3_subbed_minute':
                    player_3_subbed_minute = s[1];
                    break;
                case 'player_4_subbed_minute':
                    player_4_subbed_minute = s[1];
                    break;
                case 'player_5_subbed_minute':
                    player_5_subbed_minute = s[1];
                    break;
                case 'player_6_subbed_minute':
                    player_6_subbed_minute = s[1];
                    break;
                case 'player_7_subbed_minute':
                    player_7_subbed_minute = s[1];
                    break;
                case 'player_8_subbed_minute':
                    player_8_subbed_minute = s[1];
                    break;
                case 'player_9_subbed_minute':
                    player_9_subbed_minute = s[1];
                    break;
                case 'player_10_subbed_minute':
                    player_10_subbed_minute = s[1];
                    break;
                case 'player_11_subbed_minute':
                    player_11_subbed_minute = s[1];
                    break;
                    default:
                }
        }

        for (const s of subbedOnPlayers) {
            switch (s[0]) {
                case 'sub_1_minute':
                    sub_1_entrance_minute = s[1];
                    subbedOnPlayersCount += 1;
                    break;
                case 'sub_2_minute':
                    sub_2_entrance_minute = s[1];
                    subbedOnPlayersCount += 1;
                    break;
                case 'sub_3_minute':
                    sub_3_entrance_minute = s[1];
                    subbedOnPlayersCount += 1;
                    break;
                case 'sub_4_minute':
                    sub_4_entrance_minute = s[1];
                    subbedOnPlayersCount += 1;
                    break;
                    default:
                }
        }

        if (players) {

            player_1 = players.filter((p) => p.Player === m.player_1 );
            player_1 = `${player_1[0].first_name} ${player_1[0].surname}`;

            player_2 = players.filter((p) => p.Player === m.player_2 );
            player_2 = `${player_2[0].first_name} ${player_2[0].surname}`;

            player_3 = players.filter((p) => p.Player === m.player_3 );
            player_3 = `${player_3[0].first_name} ${player_3[0].surname}`;

            player_4 = players.filter((p) => p.Player === m.player_4 );
            player_4 = `${player_4[0].first_name} ${player_4[0].surname}`;

            player_5 = players.filter((p) => p.Player === m.player_5 );
            player_5 = `${player_5[0].first_name} ${player_5[0].surname}`;

            player_6 = players.filter((p) => p.Player === m.player_6 );
            player_6 = `${player_6[0].first_name} ${player_6[0].surname}`;

            player_7 = players.filter((p) => p.Player === m.player_7 );
            player_7 = `${player_7[0].first_name} ${player_7[0].surname}`;

            player_8 = players.filter((p) => p.Player === m.player_8 );
            player_8 = `${player_8[0].first_name} ${player_8[0].surname}`;

            player_9 = players.filter((p) => p.Player === m.player_9 );
            player_9 = `${player_9[0].first_name} ${player_9[0].surname}`;

            player_10 = players.filter((p) => p.Player === m.player_10 );
            player_10 = `${player_10[0].first_name} ${player_10[0].surname}`;

            player_11 = players.filter((p) => p.Player === m.player_11 );
            player_11 = `${player_11[0].first_name} ${player_11[0].surname}`;

            if (m.sub_1) {
                sub_1 = players.filter((p) => p.Player === m.sub_1 );
                sub_1 = `${sub_1[0].first_name} ${sub_1[0].surname}`;
            }
            
            if (m.sub_2) {
                sub_2 = players.filter((p) => p.Player === m.sub_2 );
                sub_2 = `${sub_2[0].first_name} ${sub_2[0].surname}`;
            }
            
            if (m.sub_3) {
                sub_3 = players.filter((p) => p.Player === m.sub_3 );
                sub_3 = `${sub_3[0].first_name} ${sub_3[0].surname}`;
            }
            
            if (m.sub_4) {
                sub_4 = players.filter((p) => p.Player === m.sub_4 );
                sub_4 = `${sub_4[0].first_name} ${sub_4[0].surname}`;
            }

            document.title = `${nameFormat(m.team_home)} ${m.goals_home}-${m.goals_away} ${nameFormat(m.team_away)} | StatReport`;
            m.team_home === 'Dagenham & Redbridge' ? location = 'home' : location = 'away';
        }

        return(
            <React.Fragment>
                <div className='wrapper--content__inpage--wide'>
                    <div className='content__inpage content__inpage--wide match-details'>
                        <div className='match-details__summary'>
                            {m.team_home === 'Dagenham & Redbridge' ? 
                                <h1>
                                    <span className='match-details__summary__team-home'>{nameFormat(m.team_home)}</span> 
                                    <span className='match-details__summary__score'>{m.goals_home}-{m.goals_away}</span>
                                    <Link 
                                        className='match-details__summary__team-away' 
                                        to={`../../teams/${m.opponent_id}`}
                                    >
                                        <span>
                                            {nameFormat(m.team_away)}
                                        </span>
                                    </Link>
                                </h1> :
                                <h1 className='match-details__summary__title'>
                                    <Link 
                                        className='match-details__summary__team-home' 
                                        to={`../../teams/${m.opponent_id}`}
                                    >
                                        <span>{nameFormat(m.team_home)}</span>
                                    </Link>
                                    <span className='match-details__summary__score'>{m.goals_home}-{m.goals_away}</span> 
                                    <span className='match-details__summary__team-away'>{nameFormat(m.team_away)}</span>
                                </h1> 
                            }
                            <div className='match-details__summary__goals'>
                                <div className='match-details__summary__goals__scorers'>
                                    {m.team_home === 'Dagenham & Redbridge' ? <div className='match-details__summary__scorers__home'>
                                    <MatchGoals
                                        data={DR__filteredScorers}
                                        dataArray={DR__scorersArray}
                                        keyName='surname'
                                        times={DR__scorersGoalTimeArray}
                                        type='goals'
                                    />
                            </div> : <div className='match-details__summary__scorers__home'>
                                        <MatchGoals
                                            data={OPP__filteredOppScorers}
                                            dataArray={OPP__ScorersArray}
                                            keyName='surname'
                                            times={OPP__scorersGoalTimeArray}
                                            type='goals'
                                            opposition
                                        /></div> }
                                    {m.team_away === 'Dagenham & Redbridge' ? <div className='match-details__summary__scorers__away'>
                                        <MatchGoals
                                            data={DR__filteredScorers}
                                            dataArray={DR__scorersArray}
                                            keyName='surname'
                                            times={DR__scorersGoalTimeArray}
                                            type='goals'
                                        />
                                    </div> : <div className='match-details__summary__scorers__away'>
                                        <MatchGoals
                                            data={OPP__filteredOppScorers}
                                            dataArray={OPP__ScorersArray}
                                            keyName='surname'
                                            times={OPP__scorersGoalTimeArray}
                                            type='goals'
                                            opposition
                                        />                                    </div> }
                                </div>
                                {DR__filteredAssists.length > 0 ? 
                                    <div className='match-details__summary__goals__assists'>
                                        <MatchGoals
                                            data={DR__filteredAssists}
                                            dataArray={DR__assistsArray}
                                            keyName='surname'
                                            times={DR__assistsGoalTimeArray}
                                            type='assists'
                                        />
                                    </div> 
                                : null}
                            </div>
                            <div class="match-details__summary__extra">
                                <p><Moment format="DD/MM/YYYY">{m.date}</Moment></p>
                                <p><strong>Competition:</strong> {m.competition}</p>
                                <p><strong>Opponent step:</strong> {m.step_opponent}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='wrapper--content__inpage'>

                    <div className='match-details__players'>
                        <h2>Starting XI</h2>
                        
                        <MatchPlayer
                            className = '1'
                            subMinute = {player_1_subbed_minute}
                            playerId = {m.player_1}
                            playerName = {player_1}
                            subStatus = 'off'
                        />
                        <MatchPlayer
                            className = '2'
                            subMinute = {player_2_subbed_minute}
                            playerId = {m.player_2}
                            playerName = {player_2}
                            subStatus = 'off'
                        />
                        <MatchPlayer
                            className = '3'
                            subMinute = {player_3_subbed_minute}
                            playerId = {m.player_3}
                            playerName = {player_3}
                            subStatus = 'off'
                        />
                        <MatchPlayer
                            className = '4'
                            subMinute = {player_4_subbed_minute}
                            playerId = {m.player_4}
                            playerName = {player_4}
                            subStatus = 'off'
                        />
                        <MatchPlayer
                            className = '5'
                            subMinute = {player_5_subbed_minute}
                            playerId = {m.player_5}
                            playerName = {player_5}
                            subStatus = 'off'
                        />
                        <MatchPlayer
                            className = '6'
                            subMinute = {player_6_subbed_minute}
                            playerId = {m.player_6}
                            playerName = {player_6}
                            subStatus = 'off'
                        />
                        <MatchPlayer
                            className = '7'
                            subMinute = {player_7_subbed_minute}
                            playerId = {m.player_7}
                            playerName = {player_7}
                            subStatus = 'off'
                        />
                        <MatchPlayer
                            className = '8'
                            subMinute = {player_8_subbed_minute}
                            playerId = {m.player_8}
                            playerName = {player_8}
                            subStatus = 'off'
                        />
                        <MatchPlayer
                            className = '9'
                            subMinute = {player_9_subbed_minute}
                            playerId = {m.player_9}
                            playerName = {player_9}
                            subStatus = 'off'
                        />
                        <MatchPlayer
                            className = '10'
                            subMinute = {player_10_subbed_minute}
                            playerId = {m.player_10}
                            playerName = {player_10}
                            subStatus = 'off'
                        />
                        <MatchPlayer
                            className = '11'
                            subMinute = {player_11_subbed_minute}
                            playerId = {m.player_11}
                            playerName = {player_11}
                            subStatus = 'off'
                        />

                        <h2>Substitutes</h2>
                        {subbedOnPlayersCount > 0 ? 
                            <React.Fragment>
                                <MatchPlayer
                                    className = '1'
                                    subMinute = {sub_1_entrance_minute}
                                    playerId = {m.sub_1}
                                    playerName = {sub_1}
                                    subStatus = 'on'
                                />
                                <MatchPlayer
                                    className = '2'
                                    subMinute = {sub_2_entrance_minute}
                                    playerId = {m.sub_2}
                                    playerName = {sub_2}
                                    subStatus = 'on'
                                />
                                <MatchPlayer
                                    className = '3'
                                    subMinute = {sub_3_entrance_minute}
                                    playerId = {m.sub_3}
                                    playerName = {sub_3}
                                    subStatus = 'on'
                                />
                                <MatchPlayer
                                    className = '4'
                                    subMinute = {sub_4_entrance_minute}
                                    playerId = {m.sub_4}
                                    playerName = {sub_4}
                                    subStatus = 'on'
                                />
                        </React.Fragment> 
                        : <p>No {nameFormat('Dagenham & Redbridge')} substitutes used in this match.</p>
                    }
                    </div>
                    
                    <p><strong>Attendance</strong> {m.attendance !== null && parseInt(m.attendance) > 0 ? parseInt(m.attendance).toLocaleString() : null} 
                    {m.attendance_away !== null && parseInt(m.attendance_away) > 0 ? ` (${parseInt(m.attendance_away).toLocaleString()} away)` : null}</p>
                    {m.attendance_note ? <p>{m.attendance_note} {m.team_home === 'Dagenham & Redbridge' ? 'This match is excluded from attendance records and average attendance calculations.' : null}</p> : null}
                    {m.referee ? <p><strong>Referee</strong> {m.referee}</p> : null}

                    {m.competition === 'League' ?
                        <React.Fragment>
                            <h2>League position</h2>
                            <p>League position after this game.</p>
                            <Table className='text-align--right width--75'>
                                <ResultsSummary
                                    data={filteredMatchesSeasonToDate}
                                    displayHeader
                                    displayPosition
                                    displayGoalDifference
                                    displayPoints
                                />
                            </Table>
                        </React.Fragment>
                    : null}                        
                </div>
            </React.Fragment>
        )
    } else if (!state.match.dataLoaded) {
        return (
            <Spinner />
        )
    } else {
        return(
            <Results />
        )
    }
}