import React, {Component, Suspense, lazy} from 'react';
import {groupArrayOfObjects, nameFormat, rankArrayObjects} from '../../util';

import Banner from '../../components/banner/banner';
import BannerImg from '../../images/banner/football-field-alfredo-camacho.jpg';
import DataContext from '../../components/data-context/data-context';
import Input from '../../components/form/ui/input/input';
import Player from '../../components/player/player';
import Spinner from '../../components/ui/spinner/spinner';
import Table from '../../components/hoc/table/table';
import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';
import Chart from '../../components/chart/chart';

const PlayerResults = lazy(() => import(/* webpackChunkName: 'player-results' */ '../../components/player/player-results'));

class Players extends Component {
	constructor(props) {
		super(props);
		this.state = {
            allData: '',
			playersData: '',
			startsData: '',
			subsData: '',
			goalsData: '',
			playerSelected: false,
            showMatches: false,
            dataLoaded: false,
            playerSearchText: ''
		};
	};

    showMatchesHandler = e => {
        this.setState(prevState => ({
            showMatches: !prevState.showMatches
        }));
        e.target.innerText === `Show all results` 
            ? e.target.innerText = `Hide all results`
            : e.target.innerText = `Show all results`;
    }

  	async componentDidMount() {

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
            url: 'https://www.statreport.co.uk/api/json/data-players.php',
            method: 'get'
        }).then(async (response) => {
            this.setState({playersData: response.data.results})
        })

        await api({
            url: 'https://www.statreport.co.uk/api/json/data-matches.php',
            method: 'get'
        }).then(async (response) => {
            this.setState({allData: response.data.results})
        })

        await api({
            url: 'https://www.statreport.co.uk/api/json/data-players-goals-all.php',
            method: 'get'
        }).then(async (response) => {
            this.setState({goalsData: response.data.results})
        })

        await this.setState({dataLoaded: true})
    }

    render() {
        let results = this.state.allData,
            goals = this.state.goalsData,
            players = this.state.playersData,
            showMatches = this.state.showMatches,
            playerId = window.location.pathname.split("/").pop(),
            filteredStarts,
            filteredSubs,
            filteredAllAppearances,
            filteredGoals,
            filteredPlayers,
            filterPlayersNoName,
            filteredStartsBySeason = [],
            filteredSubsBySeason = [],
            filteredGoalsBySeason = [],
            totalStarts,
            totalSubs,
            totalApps,
            totalGoals,
            startsObj = {},
            subsObj = {},
            goalsObj = {},
            seasonTemplate,
            playerResultsTemplate,
            playerResultsTableStart,
            indexTemplate = '',
            selectedPlayerName,
            firstStartDate,
            firstSubDate,
            debutDate,
            debutMatchInfo,
            debutTeamHome,
            debutTeamAway,
            debutGoalsHome,
            debutGoalsAway,
            debutMatchId;

        let banner = <Banner
            name='Players'
            description='Appearances and goal data'
            image={BannerImg}
            // Banner image: Photo by <a href="/photographer/alfcb-46394">Alfredo Camacho</a> from <a href="https://freeimages.com/">FreeImages</a>
        />

        if (results && goals && (!['players','scorers',].includes(playerId))) {
            filteredStarts = results.filter(function(result) {
                return (
                    result.player_1 === playerId ||
                    result.player_2 === playerId ||
                    result.player_3 === playerId ||
                    result.player_4 === playerId ||
                    result.player_5 === playerId ||
                    result.player_6 === playerId ||
                    result.player_7 === playerId ||
                    result.player_8 === playerId ||
                    result.player_9 === playerId ||
                    result.player_10 === playerId ||
                    result.player_11 === playerId
                )
            });

            filteredSubs = results.filter(function(result) {
                return (
                    result.sub_1 === playerId ||
                    result.sub_2 === playerId ||
                    result.sub_3 === playerId ||
                    result.sub_4 === playerId ||
                    result.sub_5 === playerId
                )
            });
            filteredPlayers = players.filter(function(result) {
                return (
                    result.Player === playerId
                )
            });
            
            filteredGoals = goals.filter(function(result) {
                return (
                    result.scorer_id === playerId
                )
            });

            selectedPlayerName = `${filteredPlayers[0].first_name} ${filteredPlayers[0].surname}`;            

            // Get debut date and associated match information
            if (filteredStarts.length > 0) {
                firstStartDate = filteredStarts.sort(function(a, b){ 
                    return new Date(a.date) - new Date(b.date); 
                });
                firstStartDate = firstStartDate[0].date;
            }
            if (filteredSubs.length > 0) {
                firstSubDate = filteredSubs.sort(function(a, b){ 
                    return new Date(a.date) - new Date(b.date); 
                });
                firstSubDate = firstSubDate[0].date;
            }
            firstStartDate < firstSubDate || !firstSubDate ? debutDate = firstStartDate : debutDate = firstSubDate;
            debutMatchInfo = results.filter(function(result) {
                return (
                    result.date === debutDate
                )
            });
            debutTeamHome = debutMatchInfo[0].team_home;
            debutTeamAway = debutMatchInfo[0].team_away;
            debutGoalsHome = debutMatchInfo[0].goals_home;
            debutGoalsAway = debutMatchInfo[0].goals_away;
            debutMatchId = debutMatchInfo[0].match_id;

            // Push all season values to array
            for (const r in filteredStarts) {
				filteredStartsBySeason.push(filteredStarts[r].season);
			}
            for (const r in filteredSubs) {
				filteredSubsBySeason.push(filteredSubs[r].season);
			}
            for (const r in filteredGoals) {
				filteredGoalsBySeason.push(filteredGoals[r].season);
			}
            
            // Calculate how many instances of each season exist
            let countStarts = keys => { startsObj[keys] = ++startsObj[keys] || 1; }
            let countSubs = keys => { subsObj[keys] = ++subsObj[keys] || 1; }
			let countGoals = keys => { goalsObj[keys] = ++goalsObj[keys] || 1; };

            // Run this on each data set
            filteredStartsBySeason.forEach(countStarts);
            filteredSubsBySeason.forEach(countSubs);
            filteredGoalsBySeason.forEach(countGoals);

            // Create a combined object so template works if one season has 0 starts or subs
			let totalObj = {...startsObj, ...subsObj, ...goalsObj};

            // Assign total values for starts/subs/goals
            totalStarts = filteredStartsBySeason.length;
            totalSubs = filteredSubsBySeason.length;
            totalApps = totalStarts + totalSubs;
            totalGoals = filteredGoalsBySeason.length;

            seasonTemplate = Object.keys(totalObj).map(key => 
                <tr key={key}>
                    <td data-type='num'>{key}</td>
                    {startsObj[key] ? <td data-type='num'>{startsObj[key]}</td> : <td data-type='num'>{startsObj[key] = 0}</td>}
                    {subsObj[key] ? <td data-type='num'>{subsObj[key]}</td> : <td data-type='num'>{subsObj[key] = 0}</td>}
                    {totalObj[key] > 0  ? <td data-type='num'>{startsObj[key] + subsObj[key]}</td>  : <td data-type='num'>{totalObj[key] = 0}</td>}
                    {goalsObj[key] ? <td data-type='num'>{goalsObj[key]}</td> : <td data-type='num'>{goalsObj[key] = 0}</td>}
                </tr>
            )

            filteredAllAppearances = filteredStarts.concat(filteredSubs);

            // Format data to build appearances and goals arrays for line chart
            const buildPlayerGoalsArrays = (() => {

                let matchCountArray = [0];
                let matchGoalCountArray = [0];
                let filteredGoalMatchIds = [];
                let matchGoalCount = 0;
                let matchCount = 0;

                for (const f of filteredGoals) {
                    filteredGoalMatchIds.push(f.match_id);
                }

                filteredAllAppearances.sort((a, b) => (a.date > b.date) ? 1 : -1)
    
                for (const appearance of filteredAllAppearances) {
                    matchCount++;
                    matchCountArray.push(matchCount);
    
                    // If matches with goal(s) scored matches all appearances match ID
                    if (filteredGoalMatchIds.includes(appearance.match_id)) {
                        // Loop through goals ID objects; as each goal has a unique object, goal count will increment accordingly if multiple goals per game
                        for (const f of filteredGoals) {
                            if (appearance.match_id === f.match_id) {
                                matchGoalCount++;
                            }
                        }
                    }
                    matchGoalCountArray.push(matchGoalCount);
                }
                return { matchCountArray, matchGoalCountArray}
            })();

            let { matchCountArray, matchGoalCountArray} = buildPlayerGoalsArrays;

            if (showMatches) {
                playerResultsTableStart = 
                <thead data-content-align='left'>
                    <tr>
                        <th>Date</th>
                        <th data-display="small">Season</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>;
                filteredAllAppearances.sort((a, b) => (a.date < b.date) ? 1 : -1)
                playerResultsTemplate = filteredAllAppearances.map(key => 
                    <Suspense fallback={<Spinner />}>
                        <PlayerResults
                            key={key}
                            date={key.date}
                            season={key.season}
                            match_id={key.match_id}
                            team_home={key.team_home}
                            team_away={key.team_away}
                            home_goals={key.goals_home}
                            away_goals={key.goals_away}
                            goals={filteredGoals}
                        />
                    </Suspense>
                )
            }

            return (
                <React.Fragment>
                    <Banner
                        image={BannerImg}
                        // Banner image: Photo by <a href="/photographer/alfcb-46394">Alfredo Camacho</a> from <a href="https://freeimages.com/">FreeImages</a>
                    />
                    <div className='wrapper--content__inpage'>
                        <Player 
                            name={selectedPlayerName} 
                            debut_date={debutDate}
                            debut_team_home={debutTeamHome}
                            debut_team_away={debutTeamAway}
                            debut_goals_home={debutGoalsHome}
                            debut_goals_away={debutGoalsAway}
                            debut_match_id={debutMatchId}
                        />
                        <Table finalRowHighlight>
                            <thead>
                                <tr>
                                    <th>Season</th>
                                    <th>Starts</th>
                                    <th>Subs</th>
                                    <th>Total</th>
                                    <th>Goals</th>
                                </tr>
                            </thead>
                            <tbody>
                                {seasonTemplate}
                                <tr>
                                    <td data-type='num'>Total</td>
                                    <td data-type='num'>{totalStarts}</td>
                                    <td data-type='num'>{totalSubs}</td>
                                    <td data-type='num'>{totalApps}</td>
                                    <td data-type='num'>{totalGoals}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <Chart
                            headingLevel='2'
                            title='Goals by games'
                            type='line'
                            legendDisplay={false}
                            labels={matchCountArray}
                            dataset1Label='Goals'
                            dataset1Values={matchGoalCountArray}
                            dataset1Fill={false}
                            dataset1Tension='0'
                            dataset1BorderColor='#f12745'
                            dataset1BorderWidth='2'
                            dataset1PointRadius='0'
                            dataset2Label='Appearances'
                            yAxesLabel = 'Goals'
                            xAxesLabel = 'Appearances'
                            xMin='0'
                            xMax={matchCountArray.length}
                            xStep='10'
                            height='400'
                        />
                        <p>
                            <button href="#" onClick={this.showMatchesHandler}>
                                Show all results
                            </button>
                        </p>
                        {this.state.showMatches ? <h3>All {selectedPlayerName} appearances</h3> : null }
                        <Table>
                            {playerResultsTableStart}
                            {playerResultsTemplate}
                        </Table>
                    </div>
                </React.Fragment>
            )
        } else {
            if (players) {
                let a;
                // Filter out instances where no name appears
                filterPlayersNoName = players.filter(function(result) {
                    return (
                        result.Player !== ''
                    )
                })
                if (results) {
                    a = filterPlayersNoName.filter(function(result) {
                        return (
                            result.player_1 === null || '' ||
                            result.player_2 === null || '' ||
                            result.player_3 === null || '' ||
                            result.player_4 === null || '' ||
                            result.player_5 === null || '' ||
                            result.player_6 === null || '' ||
                            result.player_7 === null || '' ||
                            result.player_8 === null || '' ||
                            result.player_9 === null || '' ||
                            result.player_10 === null || '' ||
                            result.player_11 === null || '' ||
                            result.sub_1 !== null || '' ||
                            result.sub_2 !== null || '' ||
                            result.sub_3 !== null || '' ||
                            result.sub_4 !== null || '' ||
                            result.sub_5 !== null || ''
                        )
                    })
                }

                // Filter players with at least 50 appearances
                let fiftyApps = filterPlayersNoName.filter(
                    (name) => {
                        return name.count >= 50;
                    }
                )

                let appearancesByRank = rankArrayObjects(filterPlayersNoName, 'count');
                if (appearancesByRank.length > 0) {
                    indexTemplate = appearancesByRank.map(p => 
                        <tr key={`${p.Player}`}>
                            <td className='width--half'>{p.rank}.</td>
                            <td className='width--threequarters' data-type='num'>{p.count}</td>
                            <td><a href={`../players/${p.Player}`}>{p.first_name} {p.surname}</a></td>
                        </tr>
                    )
                } else {
                    indexTemplate = <p>No results were returned. Please enter another search term.</p>
                }

                
            }
            if (this.state.dataLoaded) {
                document.title = `${nameFormat('Dagenham & Redbridge')} players | StatReport`;
                return (
                    <React.Fragment>
                        <Banner
                            name='Players'
                            description='Appearances and goal data'
                            image={BannerImg}
                            // Banner image: Photo by <a href="/photographer/alfcb-46394">Alfredo Camacho</a> from <a href="https://freeimages.com/">FreeImages</a>
                        />
                        <div className='wrapper--content__inpage'>
                            <p>Dagenham & Redbridge players ordered by number of appearances.</p>
                            <DataContext />
                            <div className='wrapper--input'>
                                <Input 
                                    inputType={`text`} 
                                    placeholderText={`Search for players`} 
                                    inputId={`search-players`} 
                                    inputName={`search-players`}
                                    onChange={(event) => this.setState({playerSearchText: event.target.value})} 
                                />
                            </div>
                            <Table 
                                className='width--75'
                                type='list'
                            >
                                <thead data-content-align='left'>
                                    <tr>
                                        <th aria-hidden='true' aria-label='Rank'></th>
                                        <th aria-hidden='true' aria-label='Appearances'></th>
                                        <th aria-hidden='true' aria-label='Player'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {indexTemplate}
                                </tbody>
                            </Table>
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
}

export default Players;