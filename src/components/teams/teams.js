import React, { useEffect, useState } from 'react';
import { configure, mount, shallow } from 'enzyme';

import Banner from '../banner/banner';
import SeasonOptions from '../form/options/season';
import Select from '../form/ui/select/select';
import Spinner from '../ui/spinner/spinner';
import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';

export default function Scorers() {
    const [hasError, setErrors] = useState(false);
    const [data, setData] = useState({});
    const [totalGoalsData, setTotalGoalsData] = useState({});
    const [season, setSeason] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false);

    document.title = 'Teams';

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
                url: 'https://www.statreport.co.uk/api/json/data-teams.php',
                method: 'get'
            }).then(async (response) => {
                setData(response.data);
            })

            await setDataLoaded(true);
 
        }
        fetchData();
    },[]);

    let seasonChange = e => { 
        window.location.pathname = `/players/scorers/${e.target.value}`;
    }

    // Variables
    let teamsIndex;
    let teamsArray = [];
    let teams = data.results;

    if (teams) {
        // console.log(teams);
        for (const t of teams) {
            teamsArray.push(t);
        }
        teamsIndex = teams.map(t => <p><a href={`${t.team_id}`}>{t.team_name}</a></p>);
    }
    
    return (
        <React.Fragment>
            <Banner
                name='Teams'
                description='Teams'
                image='/images/banner/football-field-alfredo-camacho.jpg'
                // Banner image: Photo by <a href="/photographer/alfcb-46394">Alfredo Camacho</a> from <a href="https://freeimages.com/">FreeImages</a>
            />
            <div className='content__inpage'>
                <h1>Teams</h1>
                {/* {teamsUnique} */}
                {teamsIndex}
            </div>
        </React.Fragment>
    )
}