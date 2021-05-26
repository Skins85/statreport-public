import React, { useEffect, useState } from 'react';
import {playerStartsFilter, playerSubsFilter} from '../../util';

import Spinner from '../ui/spinner/spinner';
import Table from '../hoc/table/table';
import useAxios from '../../hooks/useAxios';

export default function Season() {

    // State
    const { data: matchesData, hasError: matchesError, dataLoaded: matchesDataLoaded } = useAxios('https://www.statreport.co.uk/api/json/data-matches.php');
    const { data: playersData, hasError: playersError, dataLoaded: playersDataLoaded } = useAxios('https://www.statreport.co.uk/api/json/data-players.php');

    // Variables
    let matches = matchesData.results;

    if (matches) {
        matches = matches.filter((match) => match.season === '2020-21');
        let playerStarts = playerStartsFilter(matches, 'justham-elliot');
        let playerSubs = playerSubsFilter(matches, 'balanta-angelo');

        console.log(playerStarts);
        console.log(playerSubs);
    }

    

    return (
        <React.Fragment>
            <p>data</p>
        </React.Fragment>
    )

}