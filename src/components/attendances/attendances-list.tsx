import 'moment-timezone';

import Moment from 'react-moment';
import React from 'react';

export interface Props {
    match_id: string,
    date: string,
    attendance: number,
    home_goals: number,
    away_goals: number,
    team_away: string
}

const attendancesList = (props: Props) => {
    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}

export default attendancesList;