import React from 'react';

export default function Attendances(props) {
    
    let attendances = props.data,
        attendancesHomeLeauge = [];
    
    if (attendances) {
        for (const att of attendances) {
            att.team_home === 'Dagenham & Redbridge' ? attendancesHomeLeauge.push(parseInt(att.attendance)) : null;
        }
        const attendanceTotal = attendancesHomeLeauge.reduce((a, b) => a + b, 0);
        const attendanceAverage  = (attendanceTotal / attendancesHomeLeauge.length);
        console.log(attendanceAverage);
    }
    return (
        <>
            <p>Attendances</p>
        </>
    )
}
