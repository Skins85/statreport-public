import React, { useEffect, useState } from 'react';
import {playerGoalsFilter, playerStartsFilter, playerSubsFilter} from '../../../util';

import Attendances from '../components/attendances';
import Input from '../../form/ui/input/input';
import LeagueSummary from '../components/leagueSummary';
import Scorer from '../../scorer/scorer';
import Season from '../layout/season';
import SeasonOptions from '../../form/options/season';
import Select from '../../form/ui/select/select';
import { Transition } from 'react-transition-group';
import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';
import useAxios from '../../../hooks/useAxios';
import { useHistory } from 'react-router-dom';

export default function Appearances() {

    // Data
    const { data: matchesData, hasError: matchesDataError, dataLoaded: matchesDataLoaded } = useAxios('https://www.statreport.co.uk/api/json/data-matches.php');
    const { data: playersData, hasError: playersDataError, dataLoaded: playersDataLoaded } = useAxios('https://www.statreport.co.uk/api/json/data-players.php');
    const { data: goalsData, hasError: goalsDataError, dataLoaded: goalsDataLoaded } = useAxios(' https://www.statreport.co.uk/api/json/data-players-goals-all.php');

    // Variables
    let matches = matchesData.results,
        players = playersData.results,
        goals = goalsData.results,
        competitions,
        attendancesData = [],
        playerInfoAll = [],
        attendanceHighest,
        attendanceLowest;

    const defaultSeason = '2021-22';
    
    // Determine season from final URL string
    let initialSeasonValue;
    let finalUrlString = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    finalUrlString === 'season' ? initialSeasonValue = defaultSeason : initialSeasonValue = finalUrlString;
    
    // State
    const [allData, setAllData] = useState(false);
    const [season, setSeason] = useState(initialSeasonValue);

    // Access history properties to dynamic change URL path
    const history = useHistory();

    // Update URL path on season change if season not blank
    useEffect(() => season !== defaultSeason ? history.push(`/season/${season}`) : history.push(`/season/${defaultSeason}`), [season]);

    // Event handlers
    const seasonChangeHandler = e => setSeason(e.target.value);
    const allDataHandler = e => {
        setAllData(!allData);

    }

    if (matches && players && goals) {
    
        // Filter matches on selected season. If no season, default to latest season
        season !== 'season' ? matches = matches.filter((match) => match.season === season) : matches = matches.filter((match) => match.season === defaultSeason);
        season !== 'season' ? goals = goals.filter((goal) => goal.season === season) : goals = goals.filter((goal) => goal.season === defaultSeason);
        competitions = [...new Set(matches.map(match => match.competition))];

        // Order competitions
        const competitionOrder = ['League', 'Playoff', 'FA Cup', 'League Cup', 'FA Trophy', 'Football League Trophy', 'Essex Senior Cup'];
        competitions.sort((a, b) => competitionOrder.indexOf(a) - competitionOrder.indexOf(b));
    
        // START: Generate data objects to pass to child components
        for (const player of players) {

            let starts = playerStartsFilter(matches, player.Player),
                subs = playerSubsFilter(matches, player.Player),
                filteredGoals = playerGoalsFilter(goals, player.Player);
            
            const playerInfo = {
                id: player.Player,
                appearances: [
                    {
                        competition: [
                            {
                                league: {
                                    starts: starts.filter((start) => start.competition === 'League').length,
                                    subs: subs.filter((sub) => sub.competition === 'League').length,
                                },
                                playoff: {
                                    starts: starts.filter((start) => start.competition === 'Playoff').length,
                                    subs: subs.filter((sub) => sub.competition === 'Playoff').length,
                                },
                                faCup: {
                                    starts: starts.filter((start) => start.competition === 'FA Cup').length,
                                    subs: subs.filter((sub) => sub.competition === 'FA Cup').length
                                },
                                faTrophy: {
                                    starts: starts.filter((start) => start.competition === 'FA Trophy').length,
                                    subs: subs.filter((sub) => sub.competition === 'FA Trophy').length
                                },
                                leagueCup: {
                                    starts: starts.filter((start) => start.competition === 'League Cup').length,
                                    subs: subs.filter((sub) => sub.competition === 'League Cup').length
                                },
                                footballLeagueTrophy: {
                                    starts: starts.filter((start) => start.competition === 'Football League Trophy').length,
                                    subs: subs.filter((sub) => sub.competition === 'Football League Trophy').length
                                },
                                essexSeniorCup: {
                                    starts: starts.filter((start) => start.competition === 'Essex Senior Cup').length,
                                    subs: subs.filter((sub) => sub.competition === 'Essex Senior Cup').length
                                }
                                
                            }
                        ]
                    }
                ],
                goals: [
                    {
                        competition: [
                            {
                                league: filteredGoals.filter((goal) => goal.competition === 'League').length,
                                playoff: filteredGoals.filter((goal) => goal.competition === 'Playoff').length,
                                faCup: filteredGoals.filter((goal) => goal.competition === 'FA Cup').length,
                                faTrophy: filteredGoals.filter((goal) => goal.competition === 'FA Trophy').length,
                                leagueCup: filteredGoals.filter((goal) => goal.competition === 'League Cup').length,
                                footballLeagueTrophy: filteredGoals.filter((goal) => goal.competition === 'Football League Trophy').length,
                                essexSeniorCup: filteredGoals.filter((goal) => goal.competition === 'Essex Senior Cup').length
                            }
                        ]
                    }
                ]
            }

            let startsTotal = 
                playerInfo['appearances'][0]['competition'][0]['league']['starts'] + 
                playerInfo['appearances'][0]['competition'][0]['playoff']['starts'] + 
                playerInfo['appearances'][0]['competition'][0]['faCup']['starts'] +
                playerInfo['appearances'][0]['competition'][0]['faTrophy']['starts'] +
                playerInfo['appearances'][0]['competition'][0]['leagueCup']['starts'] +
                playerInfo['appearances'][0]['competition'][0]['footballLeagueTrophy']['starts'] +
                playerInfo['appearances'][0]['competition'][0]['essexSeniorCup']['starts'],
            
            subsTotal = 
                playerInfo['appearances'][0]['competition'][0]['league']['subs'] + 
                playerInfo['appearances'][0]['competition'][0]['playoff']['subs'] + 
                playerInfo['appearances'][0]['competition'][0]['faCup']['subs'] +
                playerInfo['appearances'][0]['competition'][0]['faTrophy']['subs'] +
                playerInfo['appearances'][0]['competition'][0]['leagueCup']['subs'] +
                playerInfo['appearances'][0]['competition'][0]['footballLeagueTrophy']['subs'] +
                playerInfo['appearances'][0]['competition'][0]['essexSeniorCup']['subs'],

            goalsTotal = 
                playerInfo['goals'][0]['competition'][0]['league'] + 
                playerInfo['goals'][0]['competition'][0]['playoff'] + 
                playerInfo['goals'][0]['competition'][0]['faCup'] +
                playerInfo['goals'][0]['competition'][0]['faTrophy'] +
                playerInfo['goals'][0]['competition'][0]['leagueCup'] +
                playerInfo['goals'][0]['competition'][0]['footballLeagueTrophy'] +
                playerInfo['goals'][0]['competition'][0]['essexSeniorCup'],

            appearancesTotal = startsTotal + subsTotal;

            // Build object of data for each player storing starts/subs/goals by competition
            playerInfo['appearances']['startsTotal'] = startsTotal;
            playerInfo['appearances']['totalSubs'] = subsTotal;
            playerInfo['appearances']['startsCups'] = startsTotal - playerInfo['appearances'][0]['competition'][0]['league']['starts'];
            playerInfo['appearances']['subsCups'] = subsTotal - playerInfo['appearances'][0]['competition'][0]['league']['subs'];
            playerInfo['goals']['goalsTotal'] = goalsTotal;
            playerInfo['goals']['goalsCups'] = goalsTotal - playerInfo['goals'][0]['competition'][0]['league'];
            
            appearancesTotal > 0 ? playerInfoAll.push(playerInfo) : null; // Only capture players with at least 1 appearance
            
        }

        /***** 
         ********** ATTENDANCES **********
        *****/

        // Convert attendances from strings to integers
        for (const m of matchesData.results) {
            m.attendance = parseInt(m.attendance);
        }

        function averageAttendance(season) {
            
            const attendances = matchesData.results.filter(function (el) {
                return (
                    el.team_home === 'Dagenham & Redbridge' && 
                    el.season === season &&
                    el.attendance_calc_exclude === '0'
                )
            });

            const attendancesLeague = attendances.filter((att) => att.competition === 'League');

            // Group all home league attendances
            const attendancesHomeLeauge = [];
            for (const att of attendancesLeague) {
                attendancesHomeLeauge.push(att.attendance)
            }

            // Highest home attendance
            const attendancesSorted = attendances.sort((a, b) => a.attendance < b.attendance && 1 || -1);
            attendanceHighest = attendancesSorted[0];
            attendanceLowest = attendancesSorted.slice(-1).pop();

            const attendanceTotal = attendancesHomeLeauge.reduce((a, b) => a + b, 0);
            let averageAttendance;

            Math.round(attendanceTotal / attendances.length) > 0 
                ? averageAttendance = Math.round(attendanceTotal / attendances.length)
                : averageAttendance = 0;

            return averageAttendance;
            
        }

        const seasons = ['2021-22', '2020-21', '2019-20', '2018-19', '2017-18', '2016-17', '2015-16', '2014-15', '2013-14', '2012-13'];

        for (const season of seasons) {
            const attendanceObject = {
                season: season,
                averageAttendance: averageAttendance(season),
                highest: attendanceHighest,
                lowest: attendanceLowest
            }
            attendanceObject.averageAttendance > 0 ? attendancesData.push(attendanceObject) : null;
        }

        // Sort needed to create ordinal rank in child component
        attendancesData.sort((a, b) => a.averageAttendance < b.averageAttendance && 1 || -1);

    }

    return (
        <div className='wrapper--content__inpage season'>
            <h1>Season review: {season}</h1>
            <Select onChange={e => seasonChangeHandler(e)}>
                <SeasonOptions selected={season} />
            </Select>
            <LeagueSummary 
                className={allData ? 'fade-in' : 'fade-out'}
                data={matchesData}
                season={season}
            />
            <Attendances
                data={attendancesData}
                season={season}
            />
            <Scorer
                headingLevel='2'
                titleFormat='short'
                seasonSelect='false'
            />
            {/* <Transition in={allData} timeout={500}> */}
            <Input 
                onChange={allDataHandler}
                inputId='season-all-data'
                inputType='checkbox' 
                labelRequired
                labelText='Full view'
            />
            <Season
                appearancesGoals={playerInfoAll}
                players={playersData}
                competitions={competitions}
                allData={allData}
            />
            {/* </Transition> */}
        </div>
    ) 
   
}