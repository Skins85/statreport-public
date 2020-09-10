import React, { useEffect, useState } from 'react';
import { configure, mount, shallow } from 'enzyme';

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
                url: 'https://www.statreport.co.uk/api/json/data-players-goals-all.php',
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

    return (
        mount(
            <h1>This is the counter app</h1>
        )
    )
}