export default function AverageAttendance() {

    function averageAttendance(season) {
            
            const attendancesHomeLeauge = [];

            const attendances = matchesData.results.filter(function (el) {
                return (
                    el.team_home === 'Dagenham & Redbridge' && 
                    el.season === season &&
                    el.attendance_calc_exclude === '0'
                )
            });

            for (const att of attendances) {
                attendancesHomeLeauge.push(parseInt(att.attendance))
            }

            const attendanceTotal = attendancesHomeLeauge.reduce((a, b) => a + b, 0);
            let averageAttendance;

            Math.round(attendanceTotal / attendances.length) > 0 
                ? averageAttendance = Math.round(attendanceTotal / attendances.length)
                : averageAttendance = 0;

            return averageAttendance;
            
        }

        const seasons = ['2020-21', '2019-20', '2018-19', '2017-18', '2016-17', '2015-16', '2014-15', '2013-14', '2012-13'];

        for (const season of seasons) {
            const attendanceObject = {
                season: season,
                averageAttendance: averageAttendance(season)
            }
            if (attendanceObject.averageAttendance > 0) {
                attendancesData.push(attendanceObject);
            }
        }
        return attendancesData.sort((a, b) => a.averageAttendance < b.averageAttendance && 1 || -1);

}