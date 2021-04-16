import {Link} from 'react-router-dom';
import React from 'react';

export default function homepageBlock(props) {
    return (
        <div className={`homepage__link-block ${props.class}`}>
            <Link
                to={props.link}
                className='circle'
            >
                <img 
                    src={props.imgSrc}
                    alt={props.imgAlt}
                />
            </Link>
            <h2>
                <Link to={props.link}>{props.title}</Link>
            </h2>
        </div>
    )
}