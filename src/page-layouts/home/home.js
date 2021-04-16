import Banner from '../../components/banner/banner';
import BannerImg from '../../images/banner/football-field-alfredo-camacho.jpg';
import BarChartIcon from '../../images/icons/chart-bar.png';
import HomepageBlock from '../../components/homepage/homepage-block';
import LineChartIcon from '../../images/icons/chart-line.png';
import PeopleIcon from '../../images/icons/people.png';
import React from 'react';
import TableIcon from '../../images/icons/table.png';
import {nameFormat} from '../../util';

export default function home() {
    document.title = `StatReport | An unofficial Dagenham & Redbridge statistics site`;
    return (
        <React.Fragment>
            {/* <Banner
                name='StatReport'
                description=''
                image={BannerImg}
                // Banner image: Photo by <a href="/photographer/alfcb-46394">Alfredo Camacho</a> from <a href="https://freeimages.com/">FreeImages</a>
            /> */}
            <div className='wrapper--content__inpage'>
                <div className='wrapper--homepage__title'>
                    <h1>StatReport</h1>
                    <p>An unofficial Dagenham & Redbridge statistics site</p>
                </div>
                
                <div className='wrapper--homepage__link-block'>
                    <div className='homepage__link-block--left slide-bounce-right'>
                        <HomepageBlock
                            link='./matches'
                            title='Matches'
                            imgSrc={TableIcon}
                            imgAlt='Table icon'
                        />
                        <HomepageBlock
                            link='./players'
                            title='Players'
                            imgSrc={BarChartIcon}
                            imgAlt='Players'
                        />
                    </div>
                    <div className='homepage__link-block--right slide-bounce-left'>
                        <HomepageBlock
                            link='./matches/league-positions'
                            title='League positions'
                            imgSrc={LineChartIcon}
                            imgAlt='League positions'
                        />
                        <HomepageBlock
                            link='./matches/attendances'
                            title='Attendances'
                            imgSrc={PeopleIcon}
                            imgAlt='Attendances'
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}