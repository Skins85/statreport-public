import {Link} from 'react-router-dom';
import React from 'react';

export default function homepageBlock(props) {
    return (
        <div className={`homepage__link-block ${props.class}`}>
            <Link
                to={props.link}
                className='homepage__icon'
            >
                <img 
                    src={props.imgSrc}
                    alt={props.imgAlt}
                />
                <h2>{props.title}</h2>
            </Link>
        </div>
    )
}