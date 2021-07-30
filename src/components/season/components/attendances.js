import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import React from 'react';
import { nameFormat } from '../../../util';
import ordinal from 'ordinal';

export default function Attendances(props) {

    const data = props['data'];
    const rank = data.findIndex(x => x.season === props['season']);
    const filteredSeasonAttendanceData = props.data.filter((d) => d.season === props.season);
    console.log(data.length);
        
    return (
        <>
            <h2>Attendances</h2>
            {filteredSeasonAttendanceData.length > 0 && filteredSeasonAttendanceData[0]['averageAttendance'] > 0
                ?   <>
                        <p>
                            <strong>Average: </strong> 
                            {Math.round(filteredSeasonAttendanceData[0].averageAttendance).toLocaleString()}
                            <small> ({`${ordinal(rank + 1)} of ${data.length} seasons`})</small>
                        </p> 
                        <p>
                            <strong>Highest: </strong>
                            {filteredSeasonAttendanceData[0].highest.attendance.toLocaleString()}
                            <small> (
                                {nameFormat(filteredSeasonAttendanceData[0].highest.team_home)}&nbsp;
                                <Link to={`../matches/?m=${filteredSeasonAttendanceData[0].highest.match_id}`}>
                                    {filteredSeasonAttendanceData[0].highest.goals_home}-
                                    {filteredSeasonAttendanceData[0].highest.goals_away}
                                </Link>&nbsp;
                                {filteredSeasonAttendanceData[0].highest.team_away},&nbsp;
                                {filteredSeasonAttendanceData[0].highest.competition},&nbsp;
                                {<Moment format="DD/MM/YYYY">{filteredSeasonAttendanceData[0].highest.date}</Moment>})</small>
                        </p>
                        <p>
                            <strong>Lowest: </strong>
                            {filteredSeasonAttendanceData[0].lowest.attendance.toLocaleString()}
                            <small> (
                                {nameFormat(filteredSeasonAttendanceData[0].lowest.team_home)}&nbsp;
                                <Link to={`../matches/?m=${filteredSeasonAttendanceData[0].lowest.match_id}`}>
                                    {filteredSeasonAttendanceData[0].lowest.goals_home}-
                                    {filteredSeasonAttendanceData[0].lowest.goals_away}
                                </Link>&nbsp;
                                {filteredSeasonAttendanceData[0].lowest.team_away},&nbsp;
                                {filteredSeasonAttendanceData[0].lowest.competition},&nbsp;
                                {<Moment format="DD/MM/YYYY">{filteredSeasonAttendanceData[0].lowest.date}</Moment>})</small>
                        </p>
                    </>
                : <p>Due to attendance restrictions in place during the season, this season has omitted from attendance calculations.</p>
            }
        </>
    )
}
