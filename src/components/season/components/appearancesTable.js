import Appearances from '../layout/season';
import AppearancesTableCell from './appearancesTableCell';
import React from 'react';
import Table from '../../hoc/table/table';

export default function AppearancesTable(props) {

    let appearances,
        competitionTypes = ['league', 'faCup', 'faTrophy', 'leagueCup', 'essexSeniorCup', 'footballLeagueTrophy'];

    if (props.appearances) {
        appearances = Array.from(props.appearances).map((d) => {
            return (
                <tr key={d.id}>
                    <td>{d.first_name} {d.surname}</td>
                    {competitionTypes.map((competition) => {
                        return (
                            <AppearancesTableCell 
                                starts={d.appearances[0]['competition'][0][`${competition}`]['starts']} 
                                subs={d.appearances[0]['competition'][0][`${competition}`]['subs']}
                                goals={d.goals[0]['competition'][0][`${competition}`]}
                            />
                        )
                    })}
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
                            "Starts (subs)", "Goals"
                        ],
                        "val": "League"
                    },
                    {
                        "row": 1,
                        "col": [
                            "Starts (subs)", "Goals"
                        ],
                        "val": "FA Cup"
                    },
                    {
                        "row": 1,
                        "col": [
                            "Starts (subs)", "Goals"
                        ],
                        "val": "FA Trophy"
                    },
                    {
                        "row": 1,
                        "col": [
                            "Starts (subs)", "Goals"
                        ],
                        "val": "League Cup"
                    },
                    {
                        "row": 1,
                        "col": [
                            "Starts (subs)", "Goals"
                        ],
                        "val": "Essex Senior Cup"
                    },
                    {
                        "row": 1,
                        "col": [
                            "Starts (subs)", "Goals"
                        ],
                        "val": "Football Leauge Trophy"
                    }
                ]
            }
        >
            {appearances}
        </Table>
    )
}