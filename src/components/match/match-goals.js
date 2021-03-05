import React from 'react';
import {nameFormat} from '../../util';

const matchGoals = (props) => {

    let goalObjectCount = [],
        output,
        playerObject,
        playerObjArray = [],
        timesArray = [],
        timesArraySplit = [],
        timesArrayUpdated = [];

    for (const d of props.data) {
        props.dataArray.push(d.surname);
    }

    for (const d of props.data) {
        for (const arr of props.dataArray) {
            if (arr === d[props.keyName]) {
                timesArray.push((d.scorer_id || d.assister_id) + ' ' + d.first_name + ' ' + d.surname + ' ' + d.goal_time);
            }
        }
    }
    timesArray = new Set(timesArray);
    timesArray = Array.from(timesArray);
    
    for (const t of timesArray) {
        timesArraySplit.push(t.split(' '));
    }
    
    if (props.opposition) {
        for (const t of timesArraySplit) {
            timesArrayUpdated.push(t[2])
        }
    } else {
        for (const t of timesArraySplit) {
            timesArrayUpdated.push(t[0])
        }
    }
    
    goalObjectCount = timesArrayUpdated.reduce(function(obj, b) {
        obj[b] = ++obj[b] || 1;
        return obj;
    }, {});

    // Create object of scorer data
    function createScorerObject(player_id) {

        // Blank scorer object with defined keys
        playerObject = {
            surname: '',
            goals: []
        };

        // Reduce scorers to unique, single object each, even if they have score multiple goals
        // In this instance, goals will be stored in an array for each player
        props.data.reduce(function (i, scorer) {
            if (props.opposition) {
                let player = {
                    surname: scorer.surname,
                    goal_time: scorer.goal_time
                };
                if (player.surname === player_id) {
                    if (player.surname) {
                        playerObject.surname = player.surname;
                    } 
                    playerObject.goals.push(player.goal_time);
                }

            } else {
                let player = {
                    id: (scorer.scorer_id || scorer.assister_id),
                    surname: scorer.surname,
                    goal_time: scorer.goal_time
                };
                if (player.id === player_id) {
                    if (player.surname) {
                        playerObject.surname = player.surname;
                    } else {
                        playerObject.surname = `${player.id} (o.g.)`;
                    }
                    playerObject.goals.push(player.goal_time);
                }
            }            
            
        }, []);
        
        playerObjArray.push(playerObject);
        
    }
    // Loop scorers and create unique scorer objects
    for (const m in goalObjectCount) {
        createScorerObject(m);
    }

    // Order goalscorers by earliest first
    playerObjArray.sort(function(a, b) {
        return a['goals'][0] - b['goals'][0]
    });
    
    // Clean object of arrays when blank values exist
    playerObjArray = playerObjArray.filter(obj => obj.surname !== '')
        output = playerObjArray.map((data, index) => {
            return (
            <React.Fragment>
                {props.type === 'assists' ? <h3>Assists</h3> : null}
                <p>{data.surname ? data.surname : data.id}&nbsp;(
                    {data.goals.map((d,index) => {
                        return (
                            <span key={index}>{d}&prime;{index < data.goals.length - 1 ? ',\u00A0' : ''}</span>
                        )
                    })}
                )</p>
                {props.type === 'assists' ? <sub>{nameFormat('Dagenham & Redbridge')} assists data only</sub> : null} 
            </React.Fragment>
            );
        })
    return output;
}

export default matchGoals;