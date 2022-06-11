import React, { useEffect, useState } from "react";
import { attendancesDataFeed, attendancesDataLoaded } from '../../redux/actions/attendancesActions';
import { connect, useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { setupCache } from 'axios-cache-adapter';

const test = () => {
    const dispatch = useDispatch();

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
                url: 'https://www.statreport.co.uk/api/json/data-attendances.php',
                method: 'get'
            }).then(async (response) => {
                // setData(response.data);
                dispatch(attendancesDataFeed(response.data));
            })
            // await setDataLoaded(true);
        }
        fetchData();
    },[]);
        // dispatch(attendancesDataFeed('TEST'));
    return null;

}

export default test;