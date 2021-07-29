import React from 'react';
import ordinal from 'ordinal';

export default function Attendances(props) {

    const data = props['data'];
    const rank = data.findIndex(x => x.season === props['season']);
    const filteredSeasonAttendanceData = props.data.filter((d) => d.season === props.season);
        
    return (
        <>
            <h2>Attendances</h2>
            {filteredSeasonAttendanceData.length > 0 && filteredSeasonAttendanceData[0]['averageAttendance'] > 0
                ?   <>
                        <p>
                            <strong>Average: </strong> 
                            {Math.round(filteredSeasonAttendanceData[0].averageAttendance).toLocaleString()}
                            <small> ({`${ordinal(rank + 1)}`})</small>
                        </p> 
                        <p>
                            <strong>Highest: </strong>
                            {filteredSeasonAttendanceData[0].highest.attendance.toLocaleString()}
                        </p>
                    </>
                : <p>Due to attendance restrictions in place during the season, this season has omitted from attendance calculations.</p>
            }
        </>
    )
}
