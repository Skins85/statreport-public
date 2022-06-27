import React from 'react';
import { variables } from '../../abstracts/variables';

export default function DataContext(props) {    
    return (
        <React.Fragment>
            <p>Data from {variables.DATA_SEASON_START} season onwards.</p>
        </React.Fragment>
    )
}