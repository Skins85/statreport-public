import React, { useEffect, useState } from "react";

import {Link} from 'react-router-dom';

const links = [
    { section: '/about',
        pages: [
            {
                name: 'Bio',
                path: '/bio'
            }
        ]
    },
    { section: '/matches',
        pages: [
            {
                name: 'Attendances',
                path: '/attendances'
            },
            {
                name: 'League positions',
                path: '/league-positions'
            }
        ]
    },
    { section: '/players',
        pages: [
            {
                name: 'Goalscorers',
                path: '/scorers'
            }
        ]
    }
];

export default function SecondaryNavigation(props) {

  	const [sectionString, setSectionString] = useState({});

  	useEffect(() => {
		// Check what section of the site user is in
		function sectionCheck() {
            let urlParts = props.path.split(`/`);
			let section = urlParts[1];
			setSectionString(`/${section}`);
		}
    	sectionCheck();
    },[props.path]);

    let sectionChildLinks,
        secondaryNavBlock;
    
    for (const a of links) {
        if (sectionString === a.section) {
            const pages = a.pages;
            sectionChildLinks = pages.map((data, i) => (
                <li>
                    <Link 
                        key={data.path}
                        to={`${sectionString}${data.path}`}
                    >
                        {data.name}
                    </Link>
                </li>
            ))
        }
    }

    secondaryNavBlock = <ul className="section-sublinks">{sectionChildLinks}</ul>;

    return (
        <React.Fragment>
            {sectionChildLinks ? secondaryNavBlock : null}
        </React.Fragment>
    )
}