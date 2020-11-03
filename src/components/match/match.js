import React, { useEffect, useState } from "react";

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
            await setDataLoaded(true);
        }
        fetchData();
    },[]);

    let matches = data.results,
        players = playerData.results,
        search = window.location.search,
        params = new URLSearchParams(search),
        matchId = params.get('m'),
        filteredMatches,
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
        sub_5_entrance_minute,
        subbedPlayers = [],
        subbedOnPlayers = [],
        m;

    if (matches && matchId) {
        filteredMatches = matches.filter(function(match) {
            return (
                match.match_id === matchId
            )
        });
        m = filteredMatches[0]; 

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
                    player_7_subbed_minute = s[1];
                    break;
                    default:
                }
        }

        for (const s of subbedOnPlayers) {
            switch (s[0]) {
                case 'sub_1_minute':
                    sub_1_entrance_minute = s[1];
                    break;
                case 'sub_2_minute':
                    sub_2_entrance_minute = s[1];
                    break;
                case 'sub_3_minute':
                    sub_3_entrance_minute = s[1];
                    break;
                case 'sub_4_minute':
                    sub_4_entrance_minute = s[1];
                    break;
                case 'sub_5_minute':
                    sub_5_entrance_minute = s[1];
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
                    <div className='content__inpage content__inpage--standard'>
                        
                        <h1>{nameFormat(m.team_home)} {m.goals_home}-{m.goals_away} {nameFormat(m.team_away)}</h1>
                        <p><Moment format="DD/MM/YYYY">{m.date}</Moment></p>
                        <p>
                            <span><strong>Competition:</strong> {m.competition}  </span>
                            <span><strong>Opponent step:</strong> {m.step_opponent}</span>
                        </p>
                        <h2>Starting XI</h2>
                        <p>
                            <a href={`../../players/${m.player_1}`}>{player_1}</a>
                            &nbsp;<span>{player_1_subbed_minute}</span>
                        </p>
                        <p>
                            <a href={`../../players/${m.player_2}`}>{player_2}</a>
                            &nbsp;<span>{player_2_subbed_minute}</span>
                        </p>
                        <p>
                            <a href={`../../players/${m.player_3}`}>{player_3}</a>
                            &nbsp;<span>{player_3_subbed_minute}</span>
                        </p>
                        <p>
                            <a href={`../../players/${m.player_4}`}>{player_4}</a>
                            &nbsp;<span>{player_4_subbed_minute}</span>
                        </p>
                        <p>
                            <a href={`../../players/${m.player_5}`}>{player_5}</a>
                            &nbsp;<span>{player_5_subbed_minute}</span>
                        </p>
                        <p>
                            <a href={`../../players/${m.player_6}`}>{player_6}</a>
                            &nbsp;<span>{player_6_subbed_minute}</span>
                        </p>
                        <p className='player_7'>
                            <a href={`../../players/${m.player_7}`}>{player_7}</a>
                            &nbsp;<span>{player_7_subbed_minute}</span>
                        </p>
                        <p className='player_8'>
                            <a href={`../../players/${m.player_8}`}>{player_8}</a>
                            &nbsp;<span>{player_8_subbed_minute}</span>
                        </p>
                        <p>
                            <a href={`../../players/${m.player_9}`}>{player_9}</a>
                            &nbsp;<span>{player_9_subbed_minute}</span>
                        </p>
                        <p className='player_10'>
                            <a href={`../../players/${m.player_10}`}>{player_10}</a>
                            &nbsp;<span>{player_10_subbed_minute}</span>
                        </p>
                        <p>
                            <a href={`../../players/${m.player_11}`}>{player_11}</a>
                            &nbsp;<span>{player_11_subbed_minute}</span>
                        </p>
                        <h2>Subs</h2>
                        {sub_1_entrance_minute ? <p className='sub_1'>
                            <a href={`../../players/${m.sub_1}`}>{sub_1}</a>
                            &nbsp;<span>{sub_1_entrance_minute}</span>
                        </p> : null}
                        {sub_2_entrance_minute ? <p className='sub_2'>
                            <a href={`../../players/${m.sub_2}`}>{sub_2}</a>
                            &nbsp;<span>{sub_2_entrance_minute}</span>
                        </p> : null}
                        {sub_3_entrance_minute ? <p className='sub_3'>
                            <a href={`../../players/${m.sub_3}`}>{sub_3}</a>
                            &nbsp;<span>{sub_3_entrance_minute}</span>
                        </p> : null}
                        {sub_4_entrance_minute ? <p className='sub_4'>
                            <a href={`../../players/${m.sub_4}`}>{sub_4}</a>
                            &nbsp;<span>{sub_4_entrance_minute}</span>
                        </p> : null}
                        
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