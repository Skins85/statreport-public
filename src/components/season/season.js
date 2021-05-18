import React, { useEffect, useState } from "react";

import Spinner from '../ui/spinner/spinner';
import Table from '../hoc/table/table';
import axios from 'axios';
import { nameFormat } from '../../util';
import { setupCache } from 'axios-cache-adapter';

export default function Season() {

    const [data, setData] = useState(false);
    const [hasError, setErrors] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);

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
                url: 'https://www.statreport.co.uk/api/json/data-matches.php',
                method: 'get'
            }).then(async (response) => {
                setData(response.data);
            })

            await setDataLoaded(true);
        }
        fetchData();
    },[]);

    let matches = data.results;
    console.log(matches);

    function sum(num1, num2) => num1 + num2;

    return (
        <p>Season</p>
    )

}