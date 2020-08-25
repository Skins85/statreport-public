import React from 'react';

export default function Bio() {
    document.title = 'Bio';
    return (
        <React.Fragment>
            <div className='content__inpage'>
                <div className='about about--bio'>
                    <h1>Bio</h1>
                    
                    <p>
                        I first began coding in 2010 following a career change from journalism. Beginning 
                        as a CMS Editor, I learnt on the job and in my own time, initially understanding 
                        HTML and CSS before using JavaScript to interact with the DOM. Whilst learning the 
                        fundamentals of JavaScript, I also learned how to use third-party libraries such as 
                        jQuery and jQueryUI.
                    </p>

                    <p>
                        Over time I became interested in combining front-end design with 
                        data. Around 2013 I began learning PHP and the first iteration of this site was built 
                        in this language (see <a href="https://github.com/Skins85/statreport">GitHub repository</a>). 
                        It was a great learning curve as I became familiar with creating JSON feeds to populate 
                        data-rich templates. As my projects became more involved, I learned the 
                        value of version control and code integrity using Git.
                    </p>

                    <p>
                        At the end of 2019 I decided the time was right to rewrite StatReport 
                        in React and Node as JavaScript has become my primar programming language. Whilst it's 
                        been a big undertaking, the scope and possibilities of modern JS frameworks has allowed 
                        me to develop a more agile UI and moduralise my site into components. 
                    </p>

                    <p>
                        As time goes by I hope to add to this site with new technologies and ideas. My full 
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
