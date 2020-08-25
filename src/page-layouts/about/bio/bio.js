import React from 'react';

export default function Bio() {
    document.title = 'Bio';
    return (
        <React.Fragment>
            <div className='content__inpage'>
                <div className='about about--bio'>
                    <h1>Bio</h1>

                     <p class='standfirst'>
                        My love of the Daggers dates back to the late 1990s. I've seen the highs and 
                        lows from the Ryman League to League 1 with many magical Cup runs in between. I hope 
                        the site is of interest to Daggers fans old and new and serves as a reminder to some of 
                        the great matches and players we've been able to watch over the years.
                    </p>
                    
                    <p>
                        I first began coding in 2010 following a career change from journalism. Beginning 
                        as a CMS Editor, I learnt on the job and in my own time.
                    </p>

                    <p>
                        The site was initially written in PHP, but at the end of 2019 I switched the site
                        to React on the front-end. As time goes by I hope to add to this site with new technologies and ideas. My full 
                        tech stack is listed below and further information is available on&nbsp;
                        <a href="https://www.linkedin.com/in/mark-skinsley-9b4635a7">LinkedIn</a>.
                    </p>

                    <h2>Tech stack</h2>
                    <h3>Front-end technologies</h3>
                    <ul>
                        <li>HTML5 (semantic and accessible)</li>
                        <li>SCSS</li>
                        <li>JavaScript (ES5/ES6/ES7, React)</li>
                    </ul>
                    <h3>Back-end technologies</h3>
                    <ul>
                        <li>Node JS</li>
                        <li>PHP</li>
                        <li>SQL</li>
                        <li>JSON</li>
                    </ul>
                    <h3>Third-party libraries/APIs</h3>
                    <ul>
                        <li>Google Maps API</li>
                        <li>Chart JS</li>
                    </ul>
                    <h3>Build processes</h3>
                    <ul>
                        <li>Gulp</li>
                        <li>Grunt</li>
                        <li>Webpack</li>
                    </ul>
                    <h3>CMS development</h3>
                    <ul>
                        <li>Squiz Matrix</li>
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )
}
