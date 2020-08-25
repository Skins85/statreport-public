import 'moment-timezone';

import Moment from 'react-moment';
import React from 'react';

const attendancesList = (props) => {
    return (
        <React.Fragment>
            <tr key={props.match_id}>
                <td><Moment format="DD/MM/YYYY">{props.date}</Moment></td>
                <td>{props.attendance.toLocaleString()}</td>
                <td>Daggers
                    &nbsp;
                    <a href={`../matches/match/${props.match_id}`}> 
                        {props.home_goals}-{props.away_goals}
                    </a>
                    &nbsp;
                    {props.team_away}
                </td>
            </tr>
        </React.Fragment>
    )
}

export default attendancesList;