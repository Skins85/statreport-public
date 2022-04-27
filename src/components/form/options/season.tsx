import React from 'react';

const seasons: string[] = ['2021-22', '2020-21', '2019-20', '2018-19', '2017-18', '2016-17', '2015-16', '2014-15', '2013-14', '2012-13'];

export interface Props {
    selected?: string,
}

const seasonOptions: Function = (props: Props, seasons: any[]): JSX.Element[] => 
    seasons.map((season: any) => {
        return (
            props.selected === season 
                ? <option key={season} selected value={season} name={season}>{season}</option>
                : <option key={season} value={season} name={season}>{season}</option>
        );
    });

export default seasonOptions;