import React from 'react';

export default function Table(props) {

    let headers = props.headers ? props.headers : null;
    let subheaders = false;

    headers ? headers =
            <tr>
                {headers.map(header => {
                    header['col'].length > 1 ? subheaders = true : null;
                    return (
                        <th
                            rowspan={header['row']}
                            colspan={header['col'].length}
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
                // subheaderVals.push(header['col'])
            }
        }
    }

    // for (const s of subheaderVals) {
    //     console.log(s);
    // }

    // console.log(subheaderVals)
    subheaderVals ? 
        subheaders = 
            <tr>
                {subheaderVals.map(s => {
                    // console.log(s.length);
                    return (
                        <th>{s}</th>
                    )
                })}
            </tr>
        : null

    return (
        <div class='wrapper--table'>
            <table 
                className={props.className}
                data-final-row-highlight={props.finalRowHighlight}
            >
                <thead>
                    {headers}
                    {subheaders}
                </thead>
                <tbody>
                    {props.children}
                </tbody>
            </table>
        </div>
    )
}