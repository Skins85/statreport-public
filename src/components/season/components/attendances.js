import React from 'react';

export default function Attendances(props) {
    
    let attendances = props.data,
        attendancesHomeLeauge = [],
        attendanceAverage;
    
    if (attendances) {
        for (const att of attendances) {
            if (att.team_home === 'Dagenham & Redbridge') {
                if (att.attendance_calc_exclude === '0') {
                    attendancesHomeLeauge.push(parseInt(att.attendance))
                }
            }
        }
        const attendanceTotal = attendancesHomeLeauge.reduce((a, b) => a + b, 0);
        
        // Only calculate average attendance if at least three home games exist with the attendance not being excluded
        attendancesHomeLeauge.length > 3 ? attendanceAverage = attendanceTotal / attendancesHomeLeauge.length : null;
        
    }
    return (
        <>
            <h2>Attendances</h2>
            {attendanceAverage 
                ? <p><strong>Average:</strong> {Math.round(attendanceAverage).toLocaleString()}</p> 
                : <p>Due to attendance restrictions in place during the season, this season has omitted from average attendance calculations.</p>
            }
        </>
    )
}
