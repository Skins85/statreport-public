import 'moment-timezone';

import Moment from 'react-moment';
import React from 'react';
import { nameFormat } from '../../util';

const player = (props) => {
    return (
        <div>
            <h2 key={props.id}>{props.name}</h2>
            <p>
                <span>
                    <strong>Debut: </strong>
                    <Moment format="DD/MM/YYYY">{props.debut_date}</Moment>
                </span>
                <span>&nbsp; 
                    <a href={`../matches?m=${props.debut_match_id}`}>
                        {nameFormat(props.debut_team_home)} {props.debut_goals_home}-{props.debut_goals_away} {nameFormat(props.debut_team_away)}
                    </a>
                </span>
            </p>

        </div>
    )
}

export default player;