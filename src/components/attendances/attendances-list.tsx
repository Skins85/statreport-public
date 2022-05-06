import 'moment-timezone';

import { InterfaceAttendancesShort } from '../../interfaces/interface-attendances';
import Moment from 'react-moment';
import React from 'react';

const attendancesList = (props: InterfaceAttendancesShort) => {
    return (
        <tr key={props.match_id}>
            <td><Moment format="DD/MM/YYYY">{props.date}</Moment></td>
            <td>{props.attendance.toLocaleString()}</td>
            <td>Dag & Red
                &nbsp;
                <a href={`../matches/?m=${props.match_id}`}> 
                    {props.home_goals}-{props.away_goals}
                </a>
                &nbsp;
                {props.team_away}
            </td>
        </tr>
    )
}

export default attendancesList;