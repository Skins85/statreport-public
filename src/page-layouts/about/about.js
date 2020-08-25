import Banner from '../../components/banner/banner';
import React from 'react';

export default function About() {
    document.title = 'About';
    return (
        <React.Fragment>
            <Banner
                name='About'
                description='A bit about me, the goals of the site and how it is built'
                image='/images/banner/football-field-alfredo-camacho.jpg'
                // Banner image: Photo by <a href="/photographer/alfcb-46394">Alfredo Camacho</a> from <a href="https://freeimages.com/">FreeImages</a>
            />
            <div className='content__inpage'>
                <div class='about'>
                    <img 
                        src='../images/about/mark-skinsley.jpg'
                        alt='Mark Skinsley' />
                    <p class='standfirst'>
                        My name is Mark Skinsley and I’m a full-time Web Developer and lifelong 
                        Dagenham & Redbridge supporter.  I created this site because I’ve always 
                        had a passion for statistics and wanted to apply this to the team I love.
                    </p>

                    <p>
                        This is an unofficial site and the data used is purely through research 
                        from old match reports, websites and matchday programmes. Therefore it 
                        may not be 100% accurate (see <a href='../disclaimer'>Disclaimer</a>); if you spot any errors please&nbsp;
                        <a href='mailto:statreportuk@gmail.com'>get in touch</a>. Equally, if there are any ideas for content, please let me 
                        know as my goal is to continually develop the website and add new features 
                        when time allows.
                    </p>

                    <p>
                        On the tech side, templates are built in ReactJS and server interactions 
                        by Node. Styling is SCSS and there are some third-party libraries such as 
                        ChartJS used to build the underlying functionality of the charts. My code 
                        is publicly available on <a href='https://github.com/Skins85/statreport-reactjs'>GitHub</a>&nbsp;
                        and you can find out more about me on my <a href='https://www.linkedin.com/in/mark-skinsley-9b4635a7'>LinkedIn page</a>. Further 
                        information is also available in my <a href='./about/bio'>Bio</a>.
                    </p>
                </div>
            </div>
        </React.Fragment>
    )
}
