import React, { useEffect, useState } from 'react';
import { configure, mount, shallow } from 'enzyme';

import Banner from '../banner/banner';
import SeasonOptions from '../form/options/season';
import Select from '../form/ui/select/select';
import Spinner from '../ui/spinner/spinner';
import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';

export default function Teams() {
    const [hasError, setErrors] = useState(false);
    const [teamsData, setTeamsData] = useState({});
    const [matchesData, setMatchesData] = useState({});
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
                setTeamsData(response.data);
            })

            await api({
                url: 'https://www.statreport.co.uk/api/json/data-matches.php',
                method: 'get'
            }).then(async (response) => {
                setMatchesData(response.data);
            })

            await setDataLoaded(true);
 
        }
        fetchData();
    },[]);

    let seasonChange = e => { 
        window.location.pathname = `/players/scorers/${e.target.value}`;
    }

    // Variables
    let teamsTemplate,
        teamsWrapper,
        teamsArray = [],
        teams = teamsData.results,
        matches = matchesData.results,
        teamId = window.location.pathname.split("/").pop(),
        filteredTeam;

        console.log(matches);
    
    // If teams data returned
    if (teams && matches) {
        // TDD test
        teamsWrapper = <div title='teams-index'>test</div>;

        // If team selected
        if (teamId !== 'teams') {
            // Filter unique team data based on team ID
            filteredTeam = matches.filter(function(result) {
                return (
                    result.attendance === teamId
                )
            });
            console.log(filteredTeam);
        } else { // Teams index
            teamsTemplate = teams.map(t => <p><a href={`teams/${t.team_id}`}>{t.team_name}</a></p>);   
        } // End check if team selected

    } // End if teams data returned

    return (
        <React.Fragment>
            <Banner
                name='Teams'
                description='Teams'
                image='/images/banner/football-field-alfredo-camacho.jpg'
                // Banner image: Photo by <a href="/photographer/alfcb-46394">Alfredo Camacho</a> from <a href="https://freeimages.com/">FreeImages</a>
            />
            <div className='content__inpage'>
                <h1
                    title={ dataLoaded ? 'data' : 'no-data' }
                >Teams</h1>
                <div className='data-wrapper' title={`data-loaded-${dataLoaded}`}>
                    {teamsTemplate}
                    {teamsWrapper}
                </div>
            </div>
        </React.Fragment>
    )
}