import React from 'react';

export default function Banner(props, { value, onChange }) {    

    let bannerContent;

    // Display banner content if name or description provided
    if (props.name || props.description) {
        bannerContent =
            <div className='banner__content bg-blue100'>
                <h1>{props.name}</h1>
                <p>{props.description}</p>
            </div>;
    }
    return (
        <React.Fragment>
            <div 
                className='banner'
                data-banner-image={props.image}
                data-banner-content={props.name && props.description ? `true` : `false`}
                style={{backgroundImage: `url('${props.image}')`}}
            >
                {props.name || props.description ? bannerContent : null}
            </div>
        </React.Fragment>
    )
}