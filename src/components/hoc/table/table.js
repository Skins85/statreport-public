import React from 'react';

export default function Table(props) {

    let headers = props.headers ? props.headers : null;

    headers ? headers =
        <thead>
            <tr>
                {headers.map(header => {
                    return <th>{header}</th>
                })}
            </tr>
        </thead>
    : null;    

    return (
        <div class='wrapper--table'>
            <table 
                className={props.className}
                data-final-row-highlight={props.finalRowHighlight}
            >
                {headers}
                <tbody>
                    {props.children}
                </tbody>
            </table>
        </div>
    )
}