import React, { useEffect, useState } from 'react';

import Chart from '../chart/chart';
import DataContext from '../data-context/data-context';
import SeasonOptions from '../form/options/season';
import Select from '../form/ui/select/select';
import Spinner from '../ui/spinner/spinner';
import axios from 'axios';
import { nameFormat } from '../../util';
import { setupCache } from 'axios-cache-adapter';

export default function Scorers(props) {

    // console.log(props);
    
    const [hasError, setErrors] = useState(false);
    const [data, setData] = useState({});
    const [totalGoalsData, setTotalGoalsData] = useState({});
    const [season, setSeason] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false);

    document.title = `${nameFormat('Dagenham & Redbridge')} goalscorers | StatReport`;

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
                url: 'https://www.statreport.co.uk/api/json/data-players-goals-all.php',
                method: 'get'
            }).then(async (response) => {
                setData(response.data);
            })

            await api({
                url: 'https://www.statreport.co.uk/api/json/data-player-goals-total.php',
                method: 'get'
            }).then(async (response) => {
                setTotalGoalsData(response.data);
            })

            await setDataLoaded(true);
 
        }
        fetchData();
    },[]);

    let seasonChange = e => { 
        window.location.pathname = `/players/scorers/${e.target.value}`;
    }

    let matches = data.results,
        totalGoals = totalGoalsData.results,
        seasonId = window.location.pathname.split("/").pop(),
        goalsBySeason,
        goalsBySeasonPlayer,
        goalsBySeasonPlayerArray = [];

    if (matches && seasonId !== 'scorers') {
        
        // Filter goals data by season in URL
        goalsBySeason = matches.filter(function(match) {
            return (
                match.season === seasonId
            )
        });

        // Create array of all goalscorer names
        // e.g. ["Whitely", "Okenabirhie", "Assombalonga", "Guttridge", "Robson", "Hawkins", "Hawkins", "Maguire-Drew", ...]
        Object.keys(goalsBySeason).map(key => {
            goalsBySeasonPlayerArray.push(goalsBySeason[key]);
        })

        // Create object of player names and their frequency in passed array, i.e. goal count
        // e.g. {Whitely: 14, Okenabirhie: 6, Assombalonga: 1, Guttridge: 6, Robson: 1, …}
        goalsBySeasonPlayer = goalsBySeasonPlayerArray.reduce(function(obj, b) {
            obj[b.surname] = ++obj[b.surname] || 1;
            return obj;
        }, {});

        // Convert object to array in order to sort values, e.g.
        // 0: (2) ["Hawkins", 17]
        // 1: (2) ["Whitely", 14]
        // 2: (2) ["Maguire-Drew", 10]
        // 3: (2) ["Okenabirhie", 6]
        let orderedScorersArray = [];
        for (const g in goalsBySeasonPlayer) {
            orderedScorersArray.push([g, goalsBySeasonPlayer[g]]);
        }
        orderedScorersArray.sort(function(a, b) {
            return b[1] - a[1];
        });
        
        let playerSingleGoalObject;
        let playerAllGoalsArray = [];
        let scorersListBySeason;
        
        // Create array of objects for each player containing a unique object
        // for each goal scored
        for (const a of orderedScorersArray) {
            
            playerSingleGoalObject = matches.filter(function(match) {
                return (
                    match.surname === a[0] && match.season === seasonId
                )
            });
            playerAllGoalsArray.push(playerSingleGoalObject);
            
        }
        
        // Map over each player's goalscoring data and output JSX
        let chartValues = [];
        scorersListBySeason = playerAllGoalsArray.map(s => {
            chartValues.push(s.length);
            return (
                <p>{s.length}&nbsp;
                    <a href={`../players/${s[0].scorer_id}`}>{s[0].first_name} {s[0].surname}</a>
                </p>
            )
        })

        // Create array of unique goalscorers to form chart labels
        let chartLabels = [];
        playerAllGoalsArray.map(s => {
            chartLabels.push(`${s[0]['first_name']} ${s[0]['surname']}`);
        });

        let seasonFormatted = seasonId.replace('-', '/');

        const Heading = 'h' + props.headingLevel;

        if (dataLoaded) {
            if (props.type === 'chart') {
                return (
                    <Chart
                        type='horizontalBar'
                        labels={props.labels}
                        theme='red'
                        dataValues1={props.dataValues1}
                        dataValues2={props.dataValues2}
                        headingLevel = '2'
                        title='Goalscorers'
                        xMin = '0'
                        xMax = '10'
                        xStep = '2'
                    />
                )
            } else {
                return (
                    <React.Fragment>
                        <div className='wrapper--content__inpage'>
                            {props.titleFormat === 'short' ? <Heading>Goalscorers</Heading> : <Heading>Daggers' goalscorers for {seasonFormatted} season</Heading>}
                            {props.seasonSelect !== 'false' ?
                                <Select 
                                    labelText={`Season`} 
                                    selectName={`results.season`} 
                                    onChange={seasonChange.bind(this)}
                                >
                                    <option value="" selected disabled hidden>Select season</option>
                                    <SeasonOptions />
                                </Select>
                            : null}
                            {scorersListBySeason}
                        </div>
                    </React.Fragment>
                )
            } // End: chart type check
        } else {
            return (
                <Spinner />
            )
        }

    } else {
        let allScorers;
        if (totalGoals) {
            allScorers = totalGoals.map(s => {
                return (
                    <p>{s.count}&nbsp;
                        <a href={`../players/${s.Player}`}>{s.first_name} {s.surname}</a>
                    </p>
                )
            });
        }
        if (dataLoaded) {
            return (
                <React.Fragment>
                    <div className='wrapper--content__inpage'>
                        <h1>Goalscorers</h1>
                        <DataContext />
                        <Select 
                            labelText={`Season`} 
                            selectName={`results.season`} 
                            onChange={seasonChange.bind(this)}
                        >
                            <option value="" selected disabled hidden>Select season</option>
                            <SeasonOptions />
                        </Select>
                        {allScorers}
                    </div>
                </React.Fragment>
            )
        } else {
            return (
                <Spinner />
            )
        }
        
    }
}