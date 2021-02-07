import React from 'react';
import { variables } from '../../abstracts/variables';

export default function DataContext(props) {    
    return (
        <React.Fragment>
            <p>Data from {variables.data_season_start} season onwards.</p>
        </React.Fragment>
    )
}