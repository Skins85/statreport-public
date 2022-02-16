import { CSSTransition, TransitionGroup } from 'react-transition-group';
import React, { useState } from 'react';
import { buildRootUrl, nameFormat } from '../../util';

import { Link } from 'react-router-dom';
import moment from 'moment';

export default function Result(props) {
const [showButton, setShowButton] = useState(true);
let competitionShort;

    let outcome;
    if (props.team_home === 'Dagenham & Redbridge') { 
        if (props.goals_home > props.goals_away) {
            outcome = 'outcome outcome--win';
        } else if (props.goals_home < props.goals_away) {
            outcome = 'outcome outcome--loss';
        } else {
            outcome = 'outcome outcome--draw';
        }
    }

    if (props.team_away === 'Dagenham & Redbridge') { 
        if (props.goals_away > props.goals_home) {
            outcome = 'outcome outcome--win';
        } else if (props.goals_away < props.goals_home) {
            outcome = 'outcome outcome--loss';
        } else {
            outcome = 'outcome outcome--draw';
        }
    }

    // Short competition name
    switch(props.competition) {
        case 'Essex Senior Cup':
            competitionShort = 'ESC'
            break;
        case 'FA Cup':
            competitionShort = 'FAC';
            break;
        case 'FA Trophy':
            competitionShort = 'FTR';
            break;
        case 'Football League Trophy':
            competitionShort = 'FLT';
            break;
        case 'League':
            competitionShort = 'LGE';
            break;
        case 'League Cup':
            competitionShort = 'LGC';
            break;
        case 'Playoff':
            competitionShort = 'PLY';
            break;
        default:
    }

    return (
        <tr key={props.id}>
            <td>{moment(props.date).format('DD/MM/YYYY')}</td>
            <td 
                className="results__competition no-wrap"
                data-display="mobile"
            >{props.competition === "Essex Senior Cup" ? <abbr title="Essex Senior Cup">ESC</abbr> : props.competition}
            </td>
            <td
                className=""
                data-display="mobile-only"
            >{competitionShort}
            </td>
            <td className='team__home'>{nameFormat(props.team_home)}</td>
            <td className={`${outcome} no-wrap`}>
                {props.link_enabled ? <Link to={`/matches/?m=${props.match_id}`}>
                    {props.goals_home}-{props.goals_away}
                </Link> : `${props.goals_home}-${props.goals_away}`}
            </td>
            <td className='team_away'>{nameFormat(props.team_away)}</td>
            <td 
                className='align-right results__attendance'
                data-display='small'>{props.attendance == 0 ? '-' : parseInt(props.attendance).toLocaleString()}</td>
            <td 
                className='align-right results__league__position no-wrap'
                data-display='small'
            >{props.league_position ? props.league_position : '-'}</td>
        </tr>
    )
}