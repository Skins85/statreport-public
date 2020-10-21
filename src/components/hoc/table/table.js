import React from 'react';

export default function Table(props) {
    return (
        <div class='wrapper--table'>
            <table 
                className={props.className}
                data-final-row-highlight={props.finalRowHighlight}
            >
                {props.children}
            </table>
        </div>
    )
}