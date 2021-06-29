import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';

export default function useAxios(url) {
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
                url: url,
                method: 'get'
            }).then(async (response) => {
                setData(response.data);
            });
            
            await setDataLoaded(true);
        }
        fetchData();
    },[url]); // Re-run function when URL changes
    
    return { data, hasError, dataLoaded } // Object of values returned from hook
}