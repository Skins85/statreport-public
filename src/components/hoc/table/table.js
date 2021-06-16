import React from 'react';
import { nanoid } from 'nanoid';

export default function Table(props) {

    let headers = props.headers ? props.headers : null;
    let subheaders = false;

    headers ? headers =
            <tr>
                {headers.map((header, index) => {
                    header['col'].length > 1 ? subheaders = true : null;
                    return (
                        <th key={`key${nanoid()}`}
                            rowSpan={header['row']}
                            colSpan={header['col'].length}
                        >
                            {header['val']}
                        </th>
                    )
                })}
            </tr>
    : null;

    let subheaderVals = [];
    if (subheaders) {
        for (const header of props.headers) {
            if (header['col'].length > 1) {
                let options = header['col'];
                for (const option of options) {
                    subheaderVals.push(option);
                }
            }
        }
    }
    subheaderVals.length > 0 ? 
        subheaders = 
            <tr>
                {subheaderVals.map(s => {
                    return (
                        <th key={`key${nanoid()}`}>{s}</th>
                    )
                })}
            </tr>
        : null

    return (
        <div className='wrapper--table'>
            <table 
                className={props.className}
                data-final-row-highlight={props.finalRowHighlight}
            >
                {(headers || subheaderVals.length > 0) ?
                    <React.Fragment>
                        <thead>
                            {headers}
                            {subheaders}
                        </thead>
                        <tbody>
                            {props.children}
                        </tbody>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        {props.children}
                    </React.Fragment>
                }
            </table>
        </div>
    )
}