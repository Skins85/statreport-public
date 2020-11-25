import React, { useEffect, useState } from "react";

import { Link } from 'react-router-dom';
import MatchPlayer from './match-player';
import Moment from 'react-moment';
import Results from '../../page-layouts/results/results';
import Spinner from '../ui/spinner/spinner';
import axios from 'axios';
import { nameFormat } from '../../util';
import { setupCache } from 'axios-cache-adapter';

export default function Matches() {

    const [hasError, setErrors] = useState(false);
    const [data, setData] = useState({});
    const [playerData, setPlayerData] = useState({});
    const [scorersData, setScorersData] = useState({});
    const [oppositionScorersData, setOppositionScorersData] = useState({});
    const [location, setLocation] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false);

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
                url: 'https://www.statreport.co.uk/api/json/data-matches.php',
                method: 'get'
            }).then(async (response) => {
                setData(response.data);
            })

            await api({
                url: 'https://www.statreport.co.uk/api/json/data-players.php',
                method: 'get'
            }).then(async (response) => {
                setPlayerData(response.data);
            })

            await api({
                url: 'https://www.statreport.co.uk/api/json/data-players-goals-all.php',
                method: 'get'
            }).then(async (response) => {
                setScorersData(response.data);
            })

            await api({
                url: 'https://www.statreport.co.uk/api/json/data-scorers-opposition.php',
                method: 'get'
            }).then(async (response) => {
                setOppositionScorersData(response.data);
            })

            await setDataLoaded(true);
        }
        fetchData();
    },[]);

    let matches = data.results,
        players = playerData.results,
        scorers = scorersData.results,
        oppScorers = oppositionScorersData.results,
        search = window.location.search,
        params = new URLSearchParams(search),
        matchId = params.get('m'),
        filteredMatches,
        DR__filteredScorers,
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
        OPP__scorersGoalTimeArray = [],
        DR__scorersArray = [],
        OPP__ScorersArray = [],
        scorerObj = {},
        OPP__scorerObj = {},
        scorerObjArr = [],
        OPP__ScorerObjArr = [],
        DR__scorersOutput,
        OPP__ScorersOutput;

    if (matches && scorers && oppScorers && matchId) {
        filteredMatches = matches.filter(function(match) {
            return (
                match.match_id === matchId
            )
        });
        m = filteredMatches[0]; 
        DR__filteredScorers = scorers.filter(function(match) {
            return (
                match.match_id === matchId
            )
        });

        OPP__filteredOppScorers = oppScorers.filter(function(match) {
            return (
                match.match_id === matchId
            )
        });

        let DR__timeArrSplit = [],
            DR__updatedTimeArr = [],
            DR__map;

        let OPP__timeArrSplit = [],
            OPP__updatedTimeArr = [],
            OPP__map;

            for (const s of OPP__filteredOppScorers) {
                OPP__ScorersArray.push(s.surname);
            }
            for (const s of OPP__filteredOppScorers) {
                for (const p of OPP__ScorersArray) {
                    if (p === s['surname']) {
                        OPP__scorersGoalTimeArray.push(s.surname + ' ' + s.goal_time);
                    }
                }
            }
            OPP__scorersGoalTimeArray = new Set(OPP__scorersGoalTimeArray);
            OPP__scorersGoalTimeArray = Array.from(OPP__scorersGoalTimeArray);
            for (const s of OPP__scorersGoalTimeArray) {
                OPP__timeArrSplit.push(s.split(' '));
            }
            for (const n of OPP__timeArrSplit) {
                OPP__updatedTimeArr.push(n[0])
            }
            OPP__map = OPP__updatedTimeArr.reduce(function(obj, b) {
                obj[b] = ++obj[b] || 1;
                return obj;
            }, {});
            // Create object of scorer data
            function createOppScorerObject(player_id) {

                // Blank scorer object with defined keys
                OPP__scorerObj = {
                    surname: '',
                    goals: []
                };
                // Reduce scorers to unique, single object each, even if they have score multiple goals
                // In this instance, goals will be stored in an array for each player
                OPP__filteredOppScorers.reduce(function (i, scorer) {
                    const player = {
                        surname: scorer.surname,
                        goal_time: scorer.goal_time
                    };

                    if (player.surname === player_id) {
                        OPP__scorerObj.surname = player.surname;
                        OPP__scorerObj.goals.push(player.goal_time);
                    }
                    
                }, []);

                OPP__ScorerObjArr.push(OPP__scorerObj);

            }
            // Loop scorers and create unique scorer objects
            for (const m in OPP__map) {
                createOppScorerObject(m);
            }

            OPP__ScorersOutput = OPP__ScorerObjArr.map((data, index) => {
                return (
                    <React.Fragment>
                        <p>{data.surname}&nbsp;(
                            {data.goals.map((d,index) => {
                                return (
                                    <span key={index}>{d}&prime;{index < data.goals.length - 1 ? ',\u00A0' : ''}</span>
                                )
                            })}
                        )</p>
                    </React.Fragment>
                )
            })

        /**
         * Print Dag & Red scorers with goal times.
         *
         * @param {Array of Objects} filteredScorersData - Initial Dag & Red scorers data.
         * @param {Array} scorerArrNames - Scorer names, e.g. ['Wilson', 'Wilson', 'Brundle']
         * @param {String} key - Object key to extract value, e.g. 'surname'.
         * @param {Array} timeArr - Array of Dag & Red scorers' data including goal times.
         * @param {Variable} outputTemplate - The variable the returned JSX is stored in.
         **/
        function filterDRScorerData(filteredScorersData, scorerArrNames, key, timeArr, outputTemplate) {
            for (const s of filteredScorersData) {
                scorerArrNames.push(s.surname);
            }
            for (const s of filteredScorersData) {
                for (const p of scorerArrNames) {
                    if (p === s[key]) {
                        timeArr.push(s.scorer_id + ' ' + s.first_name + ' ' + s.surname + ' ' + s.goal_time);
                    }
                }
            }
            timeArr = new Set(timeArr);
            timeArr = Array.from(timeArr);
            
            for (const s of timeArr) {
                DR__timeArrSplit.push(s.split(' '));
            }
            
            for (const n of DR__timeArrSplit) {
                DR__updatedTimeArr.push(n[0])
            }

            DR__map = DR__updatedTimeArr.reduce(function(obj, b) {
                obj[b] = ++obj[b] || 1;
                return obj;
            }, {});

            // Create object of scorer data
            function createScorerObject(player_id) {

                // Blank scorer object with defined keys
                scorerObj = {
                    surname: '',
                    goals: []
                };

                // Reduce scorers to unique, single object each, even if they have score multiple goals
                // In this instance, goals will be stored in an array for each player
                filteredScorersData.reduce(function (i, scorer) {
                    const player = {
                        id: scorer.scorer_id,
                        surname: scorer.surname,
                        goal_time: scorer.goal_time
                    };

                    if (player.id === player_id) {
                        scorerObj.surname = player.surname;
                        scorerObj.goals.push(player.goal_time);
                    }
                    
                }, []);

                scorerObjArr.push(scorerObj);
            }

            // Loop scorers and create unique scorer objects
            for (const m in DR__map) {
                createScorerObject(m);
            }

            DR__scorersOutput = scorerObjArr.map((data, index) => {
                return (
                    <React.Fragment>
                        <p>{data.surname}&nbsp;(
                            {data.goals.map((d,index) => {
                                return (
                                    <span key={index}>{d}&prime;{index < data.goals.length - 1 ? ',\u00A0' : ''}</span>
                                )
                            })}
                        )</p>
                    </React.Fragment>
                )
            })
            
        }

        // Call function to print Dag & Red scorers
        filterDRScorerData(DR__filteredScorers, DR__scorersArray, 'surname', DR__scorersGoalTimeArray, DR__scorersOutput);

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
            
        }

        return(
            <React.Fragment>
                <div className='wrapper--content__inpage'>
                    <div className='content__inpage content__inpage--standard match-details'>
                        <div className='match-details__summary'>
                            {m.team_home === 'Dagenham & Redbridge' ? 
                                <h1>
                                    <span className='match-details__summary__team-home'>{nameFormat(m.team_home)}</span> 
                                    <span className='match-details__summary__score'>{m.goals_home}-{m.goals_away}</span>
                                    <Link 
                                        className='match-details__summary__team-away' 
                                        to={m.opponent_id}
                                    >
                                        <span>
                                            {nameFormat(m.team_away)}
                                        </span>
                                    </Link>
                                </h1> :
                                <h1 className='match-details__summary__title'>
                                    <Link 
                                        className='match-details__summary__team-home' 
                                        to={m.opponent_id}
                                    >
                                        <span>{nameFormat(m.team_home)}</span>
                                    </Link>
                                    <span className='match-details__summary__score'>{m.goals_home}-{m.goals_away}</span> 
                                    <span className='match-details__summary__team-away'>{nameFormat(m.team_away)}</span>
                                </h1> 
                            }
                            <div className='match-details__summary__scorers'>
                                {m.team_home === 'Dagenham & Redbridge' ? <div className='match-details__summary__scorers__home'>{DR__scorersOutput}</div> : <div className='match-details__summary__scorers__home'>{OPP__ScorersOutput}</div> }
                                {m.team_away === 'Dagenham & Redbridge' ? <div className='match-details__summary__scorers__away'>{DR__scorersOutput}</div> : <div className='match-details__summary__scorers__away'>{OPP__ScorersOutput}</div> }
                            </div>
                            <p><Moment format="DD/MM/YYYY">{m.date}</Moment></p>
                            <p><strong>Competition:</strong> {m.competition}</p>
                            <p><strong>Opponent step:</strong> {m.step_opponent}</p>
                        </div>

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

                        
                        <p><strong>Attendance</strong> {parseInt(m.attendance).toLocaleString()} 
                        {m.attendance_away || parseInt(m.attendance_away) > 0 ? ` (${parseInt(m.attendance_away).toLocaleString()} away)` : null}</p>
                        <p><strong>League position</strong> {m.league_position}</p>
                        <p><strong>Referee</strong> {m.referee}</p>
                    </div>
                </div>
            </React.Fragment>
        )
    } else if (!dataLoaded) {
        return (
            <Spinner />
        )
    } else {
        return(
            <Results />
        )
    }
}