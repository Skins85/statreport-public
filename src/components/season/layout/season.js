import React, { useEffect, useState } from 'react';

import Appearances from '../data/season';

export default function Seasons(props) {

    let matches = props.matchesData,
        players = props.playersData;

        console.log(props.matches);
        console.log(props.players.results);

    return (
        <React.Fragment>
            <p>data</p>
        </React.Fragment>
    )

}