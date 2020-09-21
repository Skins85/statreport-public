import React from 'react';

const resultsSummary = (props) => {
    return (
        <tr key={props.id}>
            <td>{props.label}</td>
            <td>{props.played}</td>
            <td>{props.wins}</td>
            <td>{props.draws}</td>
            <td>{props.losses}</td>
            <td>{props.goalsFor}</td>
            <td>{props.goalsAgainst}</td>
        </tr>
    )
}

export default resultsSummary;