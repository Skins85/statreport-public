import 'moment-timezone';

import Moment from 'react-moment';
import React from 'react';
import { nameFormat, arrayInstancesToObject } from '../../util';
import IconFootball from '../../images/icons/football-freepik.png';

const playerResults = (props) => {
    const goalMatchIds = [],
          goalMatchIdsFrequency = {},
          goalMatchIdsFrequencyArray = [];
    props.goals.map((goal) => {
        if (goal.match_id === props.match_id) {
            goalMatchIds.push(goal.match_id);
        }
    });
    goalMatchIdsFrequencyArray.push(arrayInstancesToObject(goalMatchIds, goalMatchIdsFrequency));
    var goals = "";
    var tempArr = [];
    for (let i = 1; i <= goalMatchIdsFrequency[props.match_id]; i++) {
        tempArr.length = goalMatchIdsFrequency[props.match_id];
    }
    console.log(tempArr.length)
    return (
        <React.Fragment>
            {/* <tr props={props.ID} id={props.match_id === '2223-lg-16' ? 'match' : null}> */}
            <tr props={props.ID} id={goalMatchIds.includes(props.match_id) ? 'match ' + goalMatchIdsFrequency[props.match_id] : null}>
                <td>
                    <Moment format="DD/MM/YY">
                        {props.date}
                    </Moment>
                </td>
                <td>{props.season}</td>
                <td class='align-right'>{nameFormat(props.team_home)}</td>
                <td className='no-wrap'>
                    <a href={`../matches?m=${props.match_id}`}> 
                        {props.home_goals}-{props.away_goals}
                    </a>
                </td>
                <td>{nameFormat(props.team_away)}</td>
                <td>{goals}</td>
                 {/* <td>{[...Array(goalMatchIdsFrequency[props.match_id])].map((value, index) => (
                    <img 
                        src={IconFootball}
                        alt='Goal icon'
                        className='icon'
                    />
                ))}</td> */}
                <td>{[...Array(tempArr.length)].map((value, index) => (
                    <img 
                        src={IconFootball}
                        alt='Goal icon'
                        className='icon'
                    />
                ))}</td>
            </tr>
        </React.Fragment>
    )
}

export default playerResults;