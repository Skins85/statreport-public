import React, { useEffect, useState } from 'react';

import Appearances from '../data/season';
import AppearancesTable from '../components/appearancesTable';

export default function Season(props) {

    let matches = props.matches,
        appearances = props.appearances,
        players = props.players,
        goals = props.goals,
        appearancesData,
        goalsData;

    // console.log(props);

    if (appearances && players) {
        players = Array.from(players.results);
        
        const mergeArraysByObjectId = (a1, a2) =>
        a1.map(itm => ({
            ...a2.find((item) => (item.Player === itm.id) && item),
            ...itm
        }));

        appearancesData = mergeArraysByObjectId(appearances, players);
    }

    // if (goals) {
    //     goals = Array.from(goals.results);
        
    //     const mergeArraysByObjectId = (a1, a2) =>
    //     a1.map(itm => ({
    //         ...a2.find((item) => (item.match_id === itm.match_id) && item),
    //         ...itm
    //     }));

    //     goalsData = mergeArraysByObjectId(appearances, goals);
    //     console.log(goalsData);
    // }
    

    
    return (
        <div className='wrapper--content__inpage'>
            <AppearancesTable
                appearances={appearancesData}
            />
        </div>
    )

}