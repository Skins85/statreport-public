import React from 'react';

export default function AppearancesTableCell(props) {
    return (
        <React.Fragment>
            <td className='align-right'>{props.starts} {props.subs > 0 ? ` (${props.subs})`: null}</td>
            <td className='align-right'>{props.goals}</td>
        </React.Fragment>
    )
}
