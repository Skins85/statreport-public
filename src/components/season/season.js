import React, { useEffect, useState } from 'react';
import {playerStartsFilter, playerSubsFilter, removeEmptyObjectValues} from '../../util';

import Spinner from '../ui/spinner/spinner';
import Table from '../hoc/table/table';
import useAxios from '../../hooks/useAxios';

export default function Season() {

    // State (read-only)
    const { data: matchesData, hasError: matchesError, dataLoaded: matchesDataLoaded } = useAxios('https://www.statreport.co.uk/api/json/data-matches.php');
    const { data: playersData, hasError: playersError, dataLoaded: playersDataLoaded } = useAxios('https://www.statreport.co.uk/api/json/data-players.php');

    // Variables
    let matches = matchesData.results,
        players = playersData.results,
        playerInfoAll = []; // Send to appearances table component

    if (matches && players) {
        matches = matches.filter((match) => match.season === '2020-21');
        
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
                                    subs: subs.filter((sub) => sub.competition === 'League').length
                                },
                                facup: {
                                    starts: starts.filter((start) => start.competition === 'FA Cup').length,
                                    subs: subs.filter((sub) => sub.competition === 'FA Cup').length
                                }
                            }
                        ]
                    }
                ]
            }

            playerInfo.total =  playerInfo['appearances'][0]['competition'][0]['league']['starts'] + 
                                playerInfo['appearances'][0]['competition'][0]['league']['subs'] +
                                playerInfo['appearances'][0]['competition'][0]['facup']['starts'] +
                                playerInfo['appearances'][0]['competition'][0]['facup']['subs'];
            playerInfo.total > 0 ? playerInfoAll.push(playerInfo) : null; // Only capture players with at least 1 appearance

        }

        console.log(playerInfoAll);

    }

    return (
        <React.Fragment>
            <p>data</p>
        </React.Fragment>
    )

}