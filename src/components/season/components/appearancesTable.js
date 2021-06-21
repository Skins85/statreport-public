import Appearances from '../layout/season';
import AppearancesTableCell from './appearancesTableCell';
import React from 'react';
import Table from '../../hoc/table/table';
import { nanoid } from 'nanoid';

export default function AppearancesTable(props) {

    let competitionTypes = ['league', 'playoff', 'faCup', 'faTrophy', 'leagueCup', 'essexSeniorCup', 'footballLeagueTrophy'],
    competitionsKeys = [],
        tableheadings = [
        {
            "row": 2, 
            "col": 1,
            "val": ""
        },
    ],
    appearances;

    // Table headings => Build array of values to pass to Table component
    if (props.competitions) {
        for (const competition of props.competitions) {
            switch(competition) {
                case 'League':
                    competitionsKeys.push('league')
                    break;
                case 'Playoff':
                    competitionsKeys.push('playoff')
                    break;
                case 'FA Cup':
                    competitionsKeys.push('faCup')
                    break;
                case 'FA Trophy':
                    competitionsKeys.push('faTrophy')
                    break;
                case 'League Cup':
                    competitionsKeys.push('leagueCup')
                    break;
                case 'Essex Senior Cup':
                    competitionsKeys.push('essexSeniorCup')
                    break;
                case 'Football League Trophy':
                    competitionsKeys.push('footballLeagueTrophy')
                    break;
            }

            tableheadings.push({
                "row": 1,
                "col": [
                    "Starts (subs)", "Goals"
                ],
                "val": competition
            })
        }
        tableheadings.push({
                "row": 1,
                "col": [
                    "Starts (subs)", "Goals"
                ],
                "val": 'Total'
            })
    } 

    // Table body data => Row for each player with multiple table cells
    if (props.allData) {
        appearances = Array.from(props.appearances).map((d) => {
            return (
                <tr key={d.id}>
                    <td>{d.first_name} {d.surname}</td>
                    {competitionsKeys.map((competition) => {
                        return (
                            <AppearancesTableCell 
                                key={`key${nanoid()}`}
                                starts={d.appearances[0]['competition'][0][`${competition}`]['starts']} 
                                subs={d.appearances[0]['competition'][0][`${competition}`]['subs']}
                                goals={d.goals[0]['competition'][0][`${competition}`]}
                            />
                        )
                    })}
                    <AppearancesTableCell 
                        starts={d.appearances['startsTotal']} 
                        subs={d.appearances['totalSubs']} 
                        goals={d.goals['goalsTotal']}
                    />
                </tr>
            )
        })
    } else {
        appearances = <p>Summary data</p>
    }

    return (
        <Table headers={tableheadings}>
            {appearances}
        </Table>
    )
}