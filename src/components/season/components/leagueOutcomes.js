import React from 'react';

export default function LeagueOutcomes(props) {

    return (
        <>
            <td>{props.wins}</td>
            <td>{props.draws}</td>
            <td>{props.defeats}</td>
            <td>{props.goalsFor}</td>
            <td>{props.goalsAgainst}</td>
        </>
    )

}
