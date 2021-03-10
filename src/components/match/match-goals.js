import PropTypes from 'prop-types';
import React from 'react';
import {nameFormat} from '../../util';

const MatchGoals = (props) => {

    console.log(props);

    let footer,
        goalObjectCount = [],
        header,
        output,
        playerObject,
        playerObjArray = [],
        timesArray = [],
        timesArrayUpdated = [];

    for (const d of props.data) {
        props.dataArray.push(d.surname);
    }

    for (const d of props.data) {
        for (const arr of props.dataArray) {
            if (arr === d[props.keyName]) {
                // If >1 name provided, replace space(s) with underscore(s) to maintain array index position
                d.surname = d.surname.split(' ').join('_');
                timesArray.push((d.scorer_id || d.assister_id) + ' ' + d.first_name + ' ' + d.surname + ' ' + d.goal_time);
            }
        }
    }
    timesArray = Array.from(new Set(timesArray));
    
    const timesArraySplit = timesArray.map(t => t.split(' '));
    
    // Dag & Red and opposistion goals arrays are structured differently; take appropriate index value
    props.opposition ? timesArrayUpdated = timesArraySplit.map(t => t[2]) : timesArrayUpdated = timesArraySplit.map(t => t[0]);
    
    goalObjectCount = timesArrayUpdated.reduce((obj, b) => {
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
                    player.surname ? playerObject.surname = player.surname : playerObject.surname = `${player.id} (o.g.)`;
                    playerObject.goals.push(player.goal_time);
                }
            }                
        }, []);
        playerObjArray.push(playerObject);
    }
    
    // Loop scorers and create unique scorer objects
    Object.keys(goalObjectCount).map((key) => createScorerObject(key));

    // Order goalscorers by earliest first
    playerObjArray.sort((a, b) => a['goals'][0] - b['goals'][0]);

    if (props.type === 'assists' && props.dataArray.length > 0) {
        header = <h3>Assists</h3>;
        footer = <sub>{nameFormat('Dagenham & Redbridge')} assists data only</sub>
    }
    
    // Clean object of arrays when blank values exist
    playerObjArray = playerObjArray.filter(obj => obj.surname !== '')
        output = playerObjArray.map((data, index) => {
            return (
            <React.Fragment>
                {/* If >1 name provided, replace underscore(s) with spaces(s) */}
                <p>{data.surname ? data.surname = data.surname.split('_').join(' ') : data.id}&nbsp;(
                    {data.goals.map((d,index) => {
                        return (
                            <span key={index}>{d}&prime;{index < data.goals.length - 1 ? ',\u00A0' : ''}</span>
                        )
                    })}
                )</p>
            </React.Fragment>
            );
        })
    return [header, output, footer];
}

MatchGoals.propTypes = {
    data: PropTypes.array,
    dataArray: PropTypes.array,
    keyName: PropTypes.string,
    times: PropTypes.array,
    type: PropTypes.string,
};

export default MatchGoals;