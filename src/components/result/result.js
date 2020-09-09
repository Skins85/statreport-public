import React from 'react';
import moment from 'moment';
import { nameFormat } from '../../util';

const result = (props) => {
    return (
        <tr key={props.id}>
            <td>{moment(props.date).format('DD/MM/YYYY')}</td>
            <td>{props.competition}</td>
            <td>{nameFormat(props.team_home)}</td>
            <td className='no-wrap'>
                <a href={`matches/?m=${props.match_id}`}>
                    {props.goals_home}-{props.goals_away}
                </a>
            </td>
            <td>{nameFormat(props.team_away)}</td>
        </tr>
    )
}

export default result;