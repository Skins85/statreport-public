import {Link} from 'react-router-dom';
import React from 'react';

const matchPlayer = (props) => {
    return (
        <React.Fragment>
            {/* Substituted on */}
            {props.subStatus === 'on' ?
                props.subMinute ? 
                    <p>
                        <span className={`sub_${props.className}`}>
                            <Link to={`../../players/${props.playerId}`}>
                                {props.playerName}
                            </Link>&nbsp;(
                        </span>
                        <span>{props.subMinute}&prime;)</span>
                    </p> 
                : null
            // Player started and substituted
            :   props.subMinute ? <p>
                    <span className={`player_${props.className}`}>
                        <Link to={`../../players/${props.playerId}`}>
                            {props.playerName}
                        </Link>&nbsp;(
                    </span>
                    <span>{props.subMinute}&prime;)</span>
                </p> 
            // Player started and not substituted
            :   <p>
                    <span className={`player_${props.className}`}>
                        <Link to={`../../players/${props.playerId}`}>
                            {props.playerName}
                        </Link>
                    </span>
                </p> 
            }
        </React.Fragment>
    )
}

export default matchPlayer;