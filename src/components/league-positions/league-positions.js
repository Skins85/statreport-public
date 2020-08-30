import React, { useEffect, useState } from "react";

import Chart from 'chart.js';
import SeasonOptions from '../form/options/season';
import Select from '../form/ui/select/select';
import Spinner from '../ui/spinner/spinner';
import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';

export default function LeaguePositions() {
    const [hasError, setErrors] = useState(false);
    const [data, setData] = useState({});
    const [leaguePositionsData, setLeaguePositionsData] = useState({});
    const [oppData, setOppData] = useState({});
    const [season, setSeason] = useState();
    const [dataLoaded, setDataLoaded] = useState(false);

    document.title = 'League positions';

    useEffect(() => {
        async function fetchData() {
            
            // Cache GET requests
            let cache;
            function cacheReq() {
            
                // Define cache adapter and manage properties
                cache = setupCache({
                    maxAge: 15 * 60 * 1000
                })
            }
            await cacheReq(cache);

            // Create cache adapter instance
            const api = axios.create({
                adapter: cache.adapter
            })
        
            // Cache GET responses and save in state
            await api({
                url: 'https://www.statreport.co.uk/api/json/data-league-positions.php',
                method: 'get'
            }).then(async (response) => {
                setData(response.data);
            })
            await setDataLoaded(true);
        }
        fetchData();
    },[]);

    // Global refs/vars
    let positions = data.results,
        positionsBySeasonArray = [],
        opponentsBySeasonArray = [],
        ctx = document.getElementById('myChart'),
        myChart;

    // Change chart data on season selected
    let seasonChange = e => { 

        window.history.pushState(null, null, `/matches/league-positions/${e.target.value}`);
        let seasonId = window.location.pathname.split("/").pop();

        // Format season value to display as heading
        let seasonValue = seasonId.replace(/-/g, '/');
        setSeason(seasonValue);

        if (positions) {

            // Filter league positions by season  
            let positionsBySeason;
            for (const position of positions) {
                positionsBySeason = positions.filter(function(m) {
                    return (
                        m.season === seasonId
                    )
                }); 
            }

            for (const p of positionsBySeason) {
                positionsBySeasonArray.push(p.league_position);
                if (p.team_home !== 'Dagenham & Redbridge') {
                    opponentsBySeasonArray.push(p.team_home);
                } else if (p.team_away !== 'Dagenham & Redbridge') {
                    opponentsBySeasonArray.push(p.team_away);
                }
            }

            // Update state each new season value is selected
            setLeaguePositionsData(positionsBySeasonArray);
            setOppData(opponentsBySeasonArray);
            
            // Destroy chart instance so chart isn't duplicated
            myChart.destroy();

        }
    }

    // Initialise chart and display if league positions data exists
    if (Object.entries(leaguePositionsData).length > 0) {
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: oppData,
                datasets: [{
                    label: 'League positions',
                    data: leaguePositionsData,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    type: 'line',
                    lineTension: 0.2,
                    fill: false,
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            reverse: true,
                            min: 1,
                            max: 24,
                            stepSize: 5
                        }
                    }]
                }
            }
        });
    } else {
        // By default show final league positions per season
        if (positions) {
            let seasonGameCount;
            // { 2014-15: 39, 
            //  2015-16: 46 ... }
            seasonGameCount = positions.reduce(function(obj, b) {
                obj[b.season] = ++obj[b.season] || 1;
                return obj;
            }, {});
        
            // Convert to array for each season
            // ["2014-15", 39]
            // ["2015-16", 46]
            let seasonGameCountArray = [];
            for (const s in seasonGameCount) {
                seasonGameCountArray.push([s, seasonGameCount[s]]);
            }

            // Get final object of data per season
            let singleSeasonObject,
                finalPositionsArray = [];

            for (const a of seasonGameCountArray) {
                
                singleSeasonObject = positions.filter(function(position) {
                    return (
                        position.season === a[0]
                    )
                });
                let b = singleSeasonObject[Object.keys(singleSeasonObject)[Object.keys(singleSeasonObject).length - 1]]
                finalPositionsArray.push(b);
            }
            
            // Get final league position and season values and push to arrays to be used when building chart
            let finalPositionsSingleArray = [];
            let seasonsArray = [];
            for (const finalPosition of finalPositionsArray) {
                finalPositionsSingleArray.push(finalPosition.league_position);
                seasonsArray.push(finalPosition.season);
            }

            myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: seasonsArray,
                    datasets: [{
                        label: 'League positions',
                        data: finalPositionsSingleArray,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        type: 'line',
                        lineTension: 0,
                        fill: false,
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                reverse: true,
                                min: 1,
                                max: 24,
                                stepSize: 5
                            }
                        }]
                    }
                }
            });
        }
    }
    return (
        <React.Fragment>
            <div className="content__inpage">
                {season ? <h1>League positions: {season}</h1> : <h1>League positions by season</h1>}
                <Select 
                    labelRequired 
                    labelText={`Season`} 
                    selectName={`results.season`} 
                    onChange={seasonChange.bind(this)}
                >
                    <option value="all-seasons">All seasons</option>
                    <option value="" selected disabled hidden>Select season</option>
                    <SeasonOptions />
                </Select>
                <canvas id="myChart" width="500" height="400"></canvas>
            </div>
        </React.Fragment>
    );
} 