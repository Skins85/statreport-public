import Appearances from '../layout/season';
import React from 'react';
import Table from '../../hoc/table/table';

export default function AppearancesTable(props) {

    let appearances;

    if (props.appearances) {
        appearances = Array.from(props.appearances).map((d) => {
            return (
                <tr key={d.id}>
                    <td>{d.first_name} {d.surname}</td>
                    <td className='align-right'>{d.appearances[0]['competition'][0]['league']['starts']}
                        {d.appearances[0]['competition'][0]['league']['subs'] > 0 ? ` (${d.appearances[0]['competition'][0]['league']['subs']})` : null}</td>
                    <td className='align-right'>{d.appearances[0]['competition'][0]['league']['starts'] + d.appearances[0]['competition'][0]['league']['subs']}</td>
                </tr>
            )
        });
    }

    return (
        <Table
            headers={
                [
                    {
                        "row": 2, 
                        "col": 1,
                        "val": ""
                    },
                    {
                        "row": 1,
                        "col": [
                            "Starts (subs)", "Total"
                        ],
                        "val": "League"
                    },
                    {
                        "row": 1,
                        "col": [
                            "Starts (subs)", "Total"
                        ],
                        "val": "FA Cup"
                    }
                ]
            }
        >
            {appearances}
        </Table>
    )
}