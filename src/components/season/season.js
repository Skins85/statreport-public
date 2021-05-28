import React, { useEffect, useState } from 'react';
import {playerStartsFilter, playerStartsFilterNew, playerSubsFilter, removeEmptyObjectValues} from '../../util';

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

    const startsFull = ['player_1', 'player_2', 'player_3', 'player_4', 'player_5', 'player_6', 'player_7', 'player_8', 'player_9', 'player_10', 'player_11'];
    const starts = ['player_1', 'player_2'];
    let a = playerStartsFilterNew(matches, starts, 'justham-elliot');
    console.log(a);

    if (matches && players) {
        matches = matches.filter((match) => match.season === '2020-21');
        
        for (const player of players) {
            const playerInfo = {
                id: player.Player,
                starts: playerStartsFilter(matches, player.Player).length,
                subs: playerSubsFilter(matches, player.Player).length,
            }
            playerInfo.total = playerInfo.starts + playerInfo.subs;
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