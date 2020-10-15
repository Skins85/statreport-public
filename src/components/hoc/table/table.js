import React from 'react';

export default function Table(props) {
    return (
        <div class='wrapper--table'>
            <table className={props.className}>
                {props.children}
            </table>
        </div>
    )
}