import React, {Component} from 'react';

import {Link} from 'react-router-dom';

export default function FooterLinks() {
    return (
        <React.Fragment>
            <ul>
                <li><Link to='/disclaimer'>Disclaimer</Link></li>
            </ul>
        </React.Fragment>
    );
}