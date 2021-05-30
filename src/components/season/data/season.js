import React, { useEffect, useState } from "react";
import {playerStartsFilter, playerSubsFilter, removeEmptyObjectValues} from '../../../util';

import Season from '../layout/season';
import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';
import useAxios from '../../../hooks/useAxios';

export default function Appearances() {
    const { data: matchesData, hasError: matchesError, dataLoaded: matchesDataLoaded } = useAxios('https://www.statreport.co.uk/api/json/data-matches.php');
    const { data: playersData, hasError: playersError, dataLoaded: playersDataLoaded } = useAxios('https://www.statreport.co.uk/api/json/data-players.php');
    
    // Variables
    let matches = matchesData.results,
        players = playersData.results,
        playerInfoAll = []; // Send to appearances table component

    if (matches && players) {
    
        matches = matches.filter((match) => match.season === '2019-20');
    
        for (const player of players) {

            let starts = playerStartsFilter(matches, player.Player),
                subs = playerSubsFilter(matches, player.Player);

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
                ]
            }

            playerInfo.total =  
                playerInfo['appearances'][0]['competition'][0]['league']['starts'] + 
                playerInfo['appearances'][0]['competition'][0]['league']['subs'] +
                playerInfo['appearances'][0]['competition'][0]['faCup']['starts'] +
                playerInfo['appearances'][0]['competition'][0]['faCup']['subs'] +
                playerInfo['appearances'][0]['competition'][0]['faTrophy']['starts'] +
                playerInfo['appearances'][0]['competition'][0]['faTrophy']['subs'] +
                playerInfo['appearances'][0]['competition'][0]['leagueCup']['starts'] +
                playerInfo['appearances'][0]['competition'][0]['leagueCup']['subs'] +
                playerInfo['appearances'][0]['competition'][0]['footballLeagueTrophy']['starts'] +
                playerInfo['appearances'][0]['competition'][0]['footballLeagueTrophy']['subs'] +
                playerInfo['appearances'][0]['competition'][0]['essexSeniorCup']['starts'] +
                playerInfo['appearances'][0]['competition'][0]['essexSeniorCup']['subs'];

            playerInfo.total > 0 ? playerInfoAll.push(playerInfo) : null; // Only capture players with at least 1 appearance
        }
    }

    return (
        
        <Season
            matches={playerInfoAll}
            players={playersData}
        />
    ) 
   
}