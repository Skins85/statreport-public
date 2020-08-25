import 'moment-timezone';

import Moment from 'react-moment';
import React from 'react';

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
                <td>{props.team_home}</td>
                <td>
                    <a href={`../matches?m=${props.match_id}`}> 
                        {props.home_goals}-{props.away_goals}
                    </a>
                </td>
                <td>{props.team_away}</td>
            </tr>
        </React.Fragment>
    )
}

export default playerResults;