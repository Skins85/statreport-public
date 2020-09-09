import 'moment-timezone';

import Moment from 'react-moment';
import React from 'react';
import { nameFormat } from '../../util';

const playerResults = (props) => {
    return (
        <React.Fragment>
            <tr props={props.ID}>
                <td>
                    <Moment format="DD/MM/YY">
                        {props.date}
                    </Moment>
                </td>
                <td>{props.season}</td>
                <td class='align-right'>{nameFormat(props.team_home)}</td>
                <td className='no-wrap'>
                    <a href={`../matches?m=${props.match_id}`}> 
                        {props.home_goals}-{props.away_goals}
                    </a>
                </td>
                <td>{nameFormat(props.team_away)}</td>
            </tr>
        </React.Fragment>
    )
}

export default playerResults;