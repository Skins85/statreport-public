import React from 'react';

const seasons = ['2020-21', '2019-20', '2018-19', '2017-18', '2016-17', '2015-16', '2014-15', '2013-14', '2012-13'];

const seasonOptions = (props) => {    
    return (
        seasons.map((season) => {
            return (
                props.selected === season 
                    ? <option key={season} selected value={season} name={season}>{season}</option>
                    : <option key={season} value={season} name={season}>{season}</option>
            );
        })
    );
};

export default seasonOptions;