import { buildRootUrl, nameFormat } from '../../util';

import { Link } from 'react-router-dom';
import React from 'react';
import moment from 'moment';

const result = (props) => {

    let outcome;
    if (props.team_home === 'Dagenham & Redbridge') { 
        if (props.goals_home > props.goals_away) {
            outcome = 'outcome outcome--win';
        } else if (props.goals_home < props.goals_away) {
            outcome = 'outcome outcome--loss';
        } else {
            outcome = 'outcome outcome--draw';
        }
    }

    if (props.team_away === 'Dagenham & Redbridge') { 
        if (props.goals_away > props.goals_home) {
            outcome = 'outcome outcome--win';
        } else if (props.goals_away < props.goals_home) {
            outcome = 'outcome outcome--loss';
        } else {
            outcome = 'outcome outcome--draw';
        }
    }

    return (
        <tr key={props.id}>
            <td className={outcome} />
            <td>{moment(props.date).format('DD/MM/YYYY')}</td>
            {props.attendance ? <td>{parseInt(props.attendance).toLocaleString()}</td> : null}
            <td>{props.competition}</td>
            <td className='no-wrap'>{nameFormat(props.team_home)}</td>
            <td className='no-wrap'>
                {props.link_enabled ? <Link to={`/matches/?m=${props.match_id}`}>
                    {props.goals_home}-{props.goals_away}
                </Link> : `${props.goals_home}-${props.goals_away}`}
            </td>
            <td className='team_away no-wrap'>{nameFormat(props.team_away)}
            </td>
        </tr>
    )
}

export default result;