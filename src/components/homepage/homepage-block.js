import React from 'react';

export default function homepageBlock(props) {
    return (
        <div className='homepage__link-block'>
            <a 
                href={props.link}
                className='circle'
            >
                <img 
                    src={props.imgSrc}
                    alt={props.imgAlt}
                />
            </a>
            <h2>
                <a href={props.link}>{props.title}</a>
            </h2>
        </div>
    )
}