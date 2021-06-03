import React, { useEffect, useState } from 'react';

import Appearances from '../data/season';
import AppearancesTable from '../components/appearancesTable';

export default function Season(props) {

    let appearances = props.appearancesGoals,
        players = props.players;

    if (appearances && players) {
        players = Array.from(players.results);
        
        const mergeArraysByObjectId = (a1, a2) =>
        a1.map(itm => ({
            ...a2.find((item) => (item.Player === itm.id) && item),
            ...itm
        }));

        appearances = mergeArraysByObjectId(appearances, players);
    }
    
    return (
        <div className='wrapper--content__inpage'>
            <AppearancesTable
                appearances={appearances}
            />
        </div>
    )

}