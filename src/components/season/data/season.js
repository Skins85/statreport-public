import React, { useEffect, useState } from "react";
import {playerGoalsFilter, playerStartsFilter, playerSubsFilter} from '../../../util';

import Season from '../layout/season';
import SeasonOptions from '../../form/options/season';
import Select from '../../form/ui/select/select';
import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';
import useAxios from '../../../hooks/useAxios';
import { useHistory } from 'react-router-dom';

export default function Appearances() {

    // Data
    const { data: matchesData, hasError: matchesDataError, dataLoaded: matchesDataLoaded } = useAxios('https://www.statreport.co.uk/api/json/data-matches.php');
    const { data: playersData, hasError: playersDataError, dataLoaded: playersDataLoaded } = useAxios('https://www.statreport.co.uk/api/json/data-players.php');
    const { data: goalsData, hasError: goalsDataError, dataLoaded: goalsDataLoaded } = useAxios(' https://www.statreport.co.uk/api/json/data-players-goals-all.php');
    
    // State
    const initialSeasonValue = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    const [season, setSeason] = useState(initialSeasonValue);

    // Access history properties to dynamic change URL path
    const history = useHistory();

    // Event handlers
    const seasonChangeHandler = e => setSeason(e.target.value);

    // Update URL path on season change
    useEffect(() => history.push(`/season/${season}`), [season]);
    
    // Variables
    let matches = matchesData.results,
        players = playersData.results,
        goals = goalsData.results,
        competitions,
        playerInfoAll = []; // Send to appearances table component

    if (matches && players && goals) {
    
        matches = matches.filter((match) => match.season === season);
        goals = goals.filter((goal) => goal.season === season);
        competitions = [...new Set(matches.map(match => match.competition))];
    
        for (const player of players) {

            let starts = playerStartsFilter(matches, player.Player),
                subs = playerSubsFilter(matches, player.Player),
                filteredGoals = playerGoalsFilter(goals, player.Player);
            
            const playerInfo = {
                id: player.Player,
                appearances: [
                    {
                        competition: [
                            {
                                league: {
                                    starts: starts.filter((start) => start.competition === 'League').length,
                                    subs: subs.filter((sub) => sub.competition === 'League').length,
                                },
                                faCup: {
                                    starts: starts.filter((start) => start.competition === 'FA Cup').length,
                                    subs: subs.filter((sub) => sub.competition === 'FA Cup').length
                                },
                                faTrophy: {
                                    starts: starts.filter((start) => start.competition === 'FA Trophy').length,
                                    subs: subs.filter((sub) => sub.competition === 'FA Trophy').length
                                },
                                leagueCup: {
                                    starts: starts.filter((start) => start.competition === 'League Cup').length,
                                    subs: subs.filter((sub) => sub.competition === 'League Cup').length
                                },
                                footballLeagueTrophy: {
                                    starts: starts.filter((start) => start.competition === 'Football League Trophy').length,
                                    subs: subs.filter((sub) => sub.competition === 'Football League Trophy').length
                                },
                                essexSeniorCup: {
                                    starts: starts.filter((start) => start.competition === 'Essex Senior Cup').length,
                                    subs: subs.filter((sub) => sub.competition === 'Essex Senior Cup').length
                                }
                                
                            }
                        ]
                    }
                ],
                goals: [
                    {
                        competition: [
                            {
                                league: filteredGoals.filter((goal) => goal.competition === 'League').length,
                                faCup: filteredGoals.filter((goal) => goal.competition === 'FA Cup').length,
                                faTrophy: filteredGoals.filter((goal) => goal.competition === 'FA Trophy').length,
                                leagueCup: filteredGoals.filter((goal) => goal.competition === 'League Cup').length,
                                footballLeagueTrophy: filteredGoals.filter((goal) => goal.competition === 'Football League Trophy').length,
                                essexSeniorCup: filteredGoals.filter((goal) => goal.competition === 'Essex Senior Cup').length
                            }
                        ]
                    }
                ]
            }

            let startsTotal = 
                playerInfo['appearances'][0]['competition'][0]['league']['starts'] + 
                playerInfo['appearances'][0]['competition'][0]['faCup']['starts'] +
                playerInfo['appearances'][0]['competition'][0]['faTrophy']['starts'] +
                playerInfo['appearances'][0]['competition'][0]['leagueCup']['starts'] +
                playerInfo['appearances'][0]['competition'][0]['footballLeagueTrophy']['starts'] +
                playerInfo['appearances'][0]['competition'][0]['essexSeniorCup']['starts'],
            
            subsTotal = 
                playerInfo['appearances'][0]['competition'][0]['league']['subs'] + 
                playerInfo['appearances'][0]['competition'][0]['faCup']['subs'] +
                playerInfo['appearances'][0]['competition'][0]['faTrophy']['subs'] +
                playerInfo['appearances'][0]['competition'][0]['leagueCup']['subs'] +
                playerInfo['appearances'][0]['competition'][0]['footballLeagueTrophy']['subs'] +
                playerInfo['appearances'][0]['competition'][0]['essexSeniorCup']['subs'],

            goalsTotal = 
                playerInfo['goals'][0]['competition'][0]['league'] + 
                playerInfo['goals'][0]['competition'][0]['faCup'] +
                playerInfo['goals'][0]['competition'][0]['faTrophy'] +
                playerInfo['goals'][0]['competition'][0]['leagueCup'] +
                playerInfo['goals'][0]['competition'][0]['footballLeagueTrophy'] +
                playerInfo['goals'][0]['competition'][0]['essexSeniorCup'],

            appearancesTotal = startsTotal + subsTotal;

            // Build object of data for each player storing starts/subs/goals by competition
            playerInfo['appearances']['totalStarts'] = startsTotal;
            playerInfo['appearances']['totalSubs'] = subsTotal;
            playerInfo['goals']['totalGoals'] = goalsTotal;

            appearancesTotal > 0 ? playerInfoAll.push(playerInfo) : null; // Only capture players with at least 1 appearance

        }
    }

    return (
        <div className='wrapper--content__inpage'>
            <h1>Season review: {season}</h1>
            <Select onChange={e => seasonChangeHandler(e)}>
                <SeasonOptions selected={season} />
            </Select>
            <Season
                appearancesGoals={playerInfoAll}
                players={playersData}
                competitions={competitions}
            />
        </div>
    ) 
   
}