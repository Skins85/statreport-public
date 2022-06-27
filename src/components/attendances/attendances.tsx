import React, { useEffect, useState } from "react";
import { nameFormat, rankArrayObjects } from '../../util';

import AttendancesList from './attendances-list';
import Banner from '../../components/banner/banner';
import Chart from 'chart.js';
import { InterfaceAttendances } from '../../interfaces/interface-attendances';
import { Link } from 'react-router-dom';
import SeasonOptions from '../form/options/season';
import Select from '../form/ui/select/select';
import Spinner from '../../components/ui/spinner/spinner';
import Table from '../../components/hoc/table/table';
import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';

export default function Attendances() {
    const [hasError, setErrors] = useState(false);
    const [data, setData] = useState([]);
    const [attData, setAttData] = useState([]);
    const [aveAttData, setAveAttData] = useState([]);
    const [oppData, setOppData] = useState([]);
    const [season, setSeason] = React.useState<string | null>(null);
    const [dataLoaded, setDataLoaded] = useState(false);

    let noAttendances,
        baseUrl;

    if (process.env.NODE_ENV === 'development') {
        baseUrl = 'http://localhost:8080'
    } else {
        baseUrl = 'http://www.statreport.co.uk'
    }

    document.title = `${nameFormat('Dagenham & Redbridge')} attendances | StatReport`;

    useEffect(() => {
        async function fetchData() {
            
            // Cache GET requests
            let cache: any;
            function cacheReq() {
            
                // Define cache adapter and manage properties
                cache = setupCache({
                    maxAge: 15 * 60 * 1000
                })
            }
            await cacheReq(); // Was previously blank/no argument

            // Create cache adapter instance
            const api = axios.create({
                adapter: cache.adapter
            })
        
            // Cache GET responses and save in state
            await api({
                url: 'https://www.statreport.co.uk/api/json/data-attendances.php',
                method: 'get'
            }).then(async (response) => {
                setData(response.data.results);
            })
            await setDataLoaded(true);
        }
        fetchData();
    },[]);

    let attendances: InterfaceAttendances[] = data,
        attendancesBySeasonArray: any = [],
        opponentBySeasonArray: any = [],
        rollingAverageArray: number[] = [],
        rollingTotal: number = 0,
        rollingCount: number = 0,
        ctx = document.getElementById('myChart') as HTMLCanvasElement,
        myChart: any,
        attendancesDescending,
        attendancesAscending,
        top10: JSX.Element[],
        bottom10: JSX.Element[];

    // Change chart data on season selected
    let seasonChange = (e:any) => { 
        window.history.pushState(null, null, `/matches/attendances/${e.target.value}`);

        let seasonId = window.location.pathname.split("/").pop();

        // Format season value to display as heading
        let seasonValue = seasonId.replace(/-/g, '/');
        setSeason(seasonValue);
        
        if (attendances) {
            
            // Filter attendances by season  
            let attendancesBySeason: any = [];
            for (const b of attendances) {
                attendancesBySeason = attendances.filter(function(m: any) {
                    return (
                        m.season === seasonId
                    )
                }); 
            }

            for (const c of attendancesBySeason) {
                attendancesBySeasonArray.push(parseInt(c.attendance));
                opponentBySeasonArray.push(c.team_away);
            }

            // Calculate rolling average and store in global array
            for (const d of attendancesBySeasonArray) {
                rollingTotal = rollingTotal + d;
                rollingCount = rollingCount + 1;
                rollingAverageArray.push(Math.round(rollingTotal/rollingCount));
            }

            // Update state each new season value is selected
            setAttData(attendancesBySeasonArray);
            setAveAttData(rollingAverageArray);
            setOppData(opponentBySeasonArray);
            
            // Destroy chart instance so chart isn't duplicated
            if (myChart) {
                myChart.destroy();
            };

        }
    }

    // Initialise chart and display if attendance data exists
    if (Object.entries(attData).length > 0) {
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: oppData,
                datasets: [{
                    label: 'Attendances',
                    data: attData,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    type: 'bar',
                }, {
                    label: 'Average attendance',
                    data: aveAttData,
                    type: 'line',
                    fill: false
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    } else {
        // Top 10 attendances
        if (attendances) { 

            if (season) {
                noAttendances = <p>No attendance data for this season. Please select another season.</p>
            } else {
                // Slice original attendances array to prevent mutation
                attendancesDescending = attendances.slice().sort((a: any, b: any) => b.attendance - a.attendance);
                attendancesAscending = attendances.slice().sort((a: any, b: any) => a.attendance - b.attendance);
                
                let attDescRank = rankArrayObjects(attendancesDescending, 'attendance'),
                    attAscRank = rankArrayObjects(attendancesAscending, 'attendance'); 
                
                top10 = attDescRank.slice(0, 10).map((i: any) => {
                    return (
                        <React.Fragment>
                            <AttendancesList
                                rank = {i.rank}
                                match_id = {i.match_id}
                                date = {i.date}
                                attendance = {parseInt(i.attendance.toLocaleString())}
                                home_goals = {i.goals_home}
                                away_goals = {i.goals_away}
                                team_away = {i.team_away}
                            />
                        </React.Fragment>
                    )
                })
                bottom10 = attAscRank.slice(0, 10).map((i: any) => {
                    return (
                        <AttendancesList
                            rank = {attendances.length - i.rank}
                            match_id = {i.match_id}
                            date = {i.date}
                            attendance = {parseInt(i.attendance.toLocaleString())}
                            home_goals = {i.goals_home}
                            away_goals = {i.goals_away}
                            team_away = {i.team_away}
                        />
                    )
                })
            }
        } else {
            return (
                <Spinner />
            )
        }
    }


    console.log(process.env.NODE_ENV)

    if (dataLoaded) {
        return (
            <React.Fragment>
                <div className="wrapper--content__inpage">
                    {season ? <h1>Attendances: {season}</h1> : <h1>Attendances</h1>}
                    {season ? <p><a href={`${baseUrl}/matches/attendances`}>&lt; Back to Attendances</a></p> : null }
                    <Select 
                        labelRequired 
                        labelText={`Season`} 
                        selectName={`results.season`} 
                        onChange={seasonChange.bind(this)}
                    >
                        <option value="" selected >Select season</option>
                        <SeasonOptions />
                    </Select>
                    {noAttendances}
                    {season ? null : <React.Fragment><h2>Highest attendances</h2><Table className='width--75'><tbody>{top10}</tbody></Table></React.Fragment> }
                    {season ? null : <React.Fragment><h2>Lowest attendances</h2><Table className='width--75'><tbody>{bottom10}</tbody></Table></React.Fragment> }
                    <canvas 
                        id="myChart" 
                        width="500" 
                        height="400"
                        data-display={season ? `true` : `false`}
                    />
                </div>
            </React.Fragment>
        );
    } else {
        return (
            <Spinner />
        )
    }
    
}