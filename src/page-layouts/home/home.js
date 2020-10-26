import Banner from '../../components/banner/banner';
import HomepageBlock from '../../components/homepage/homepage-block';
import React from 'react';
import {nameFormat} from '../../util';

export default function home() {
    document.title = `StatReport | An unofficial Dagenham & Redbridge statistics site`;
    return (
        <React.Fragment>
            <Banner
                name='StatReport'
                description=''
                image='/images/banner/football-field-alfredo-camacho.jpg'
                // Banner image: Photo by <a href="/photographer/alfcb-46394">Alfredo Camacho</a> from <a href="https://freeimages.com/">FreeImages</a>
            />
            <div className='wrapper--content__inpage'>
                <div className='wrapper--homepage__link-block'>
                    <HomepageBlock
                        link='./matches'
                        title='Matches'
                        imgSrc='../images/icons/table.png'
                        imgAlt='Table icon'
                    />
                    <HomepageBlock
                        link='./players'
                        title='Players'
                        imgSrc='../images/icons/chart-bar.png'
                        imgAlt='Players'
                    />
                    <HomepageBlock
                        link='./matches/league-positions'
                        title='League positions'
                        imgSrc='../images/icons/chart-line.png'
                        imgAlt='League positions'
                    />
                    <HomepageBlock
                        link='./matches/attendances'
                        title='Attendances'
                        imgSrc='../images/icons/people.png'
                        imgAlt='Attendances'
                    />
                </div>
            </div>
        </React.Fragment>
    )
}