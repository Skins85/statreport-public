import React from 'react';

const debut = (props) => {
    return (
        <div>
            <p>
                <strong>Debut: </strong>
                {props.team_home} {props.home_goals}-{props.away_goals} {props.team_away}
            </p>
        </div>
    )
}

export default debut;