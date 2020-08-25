import React from 'react';
import moment from 'moment'

const result = (props) => {
    return (
        <tr key={props.id}>
            <td>{moment(props.date).format('DD/MM/YYYY')}</td>
            <td>{props.competition}</td>
            <td>{props.team_home}</td>
            <td>
                <a href={`matches/?m=${props.match_id}`}>
                    {props.goals_home}-{props.goals_away}
                </a>
            </td>
            <td>{props.team_away}</td>
        </tr>
    )
}

export default result;