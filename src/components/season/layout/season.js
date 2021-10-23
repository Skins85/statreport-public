import { CSSTransition, TransitionGroup } from "react-transition-group";
import React, { useEffect, useState } from 'react';

import Appearances from '../data/season';
import AppearancesTable from '../components/appearancesTable';
import SeasonOptions from '../../form/options/season';
import Select from '../../form/ui/select/select';

{/* <style>
    .transition-enter {
    opacity: 0.01;
    transform: translate(0, -10px);
  }
  .transition-enter-active {
    opacity: 1;
    transform: translate(0, 0);
    transition: all 300ms ease-in;
  }
  .transition-exit {
    opacity: 1;
    transform: translate(0, 0);
  }
  .transition-exit-active {
    opacity: 0.01;
    transform: translate(0, 10px);
    transition: all 300ms ease-in;
  }
    </style> */}

export default function Season(props) {

    let appearances = props.appearancesGoals,
        players = props.players,
        competitions = props.competitions;

    if (appearances && players) {

        // If data summary selected, condense competitions array to two values (League and Cup)
        !props.allData ? competitions = ['League', 'Cup'] : null;

        players = Array.from(players.results);
        
        const mergeArraysByObjectId = (a1, a2) =>
        a1.map(itm => ({
            ...a2.find((item) => (item.Player === itm.id) && item),
            ...itm
        }));

        appearances = mergeArraysByObjectId(appearances, players);
    }
    
    return (
        <AppearancesTable
            appearances={appearances}
            competitions={competitions}
            allData={props.allData}
        />
    )

}