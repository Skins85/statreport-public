import React from 'react';

const matchPlayer = (props) => {
    return (
        <React.Fragment>
            {props.subMinute ? 
                <p>
                    <span className={`sub_${props.className}`}>
                        <a href={`../../players/${props.playerId}`}>
                            {props.playerName}
                        </a>&nbsp;(
                    </span>
                    <span>{props.subMinute}&prime;)</span>
                </p> 
            : null}
        </React.Fragment>
    )
}

export default matchPlayer;