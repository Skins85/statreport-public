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
                    <td>
                        {d.appearances[0]['competition'][0]['league']['starts']}
                        {d.appearances[0]['competition'][0]['league']['subs'] > 0 ? ` (${d.appearances[0]['competition'][0]['league']['subs']})` : null}
                        
                    </td>
                </tr>
            )
        });
    }

    return (
        <Table
            headers={['', 'League','FA Cup']}
        >
            {appearances}
        </Table>
    )
}