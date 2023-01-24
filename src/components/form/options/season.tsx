import React from 'react';
import { FormSeasonOptions } from '../../../interfaces/interface-form-ui';

const seasonOptions = (props: FormSeasonOptions) => {
    return (
        <>
            <option selected={props.season === 'all' ? true : false} key='all' value='all' name='all'>All seasons</option>
            <option selected={props.season === '2022-23' ? true : false} key='2022-23' value='2022-23' name='2022-23'>2022-23</option>
            <option selected={props.season === '2021-22' ? true : false} key='2021-22' value='2021-22' name='2021-22'>2021-22</option>
            <option selected={props.season === '2020-21' ? true : false} key='2020-21' value='2020-21' name='2020-21'>2020-21</option>
            <option selected={props.season === '2019-20' ? true : false} key='2019-20' value='2019-20' name='2019-20'>2019-20</option>
            <option selected={props.season === '2018-19' ? true : false} key='2018-19' value='2018-19' name='2018-19'>2018-19</option>
            <option selected={props.season === '2017-18' ? true : false} key='2017-18' value='2017-18' name='2017-18'>2017-18</option>
            <option selected={props.season === '2016-17' ? true : false} key='2016-17' value='2016-17' name='2016-17'>2016-17</option>
            <option selected={props.season === '2015-16' ? true : false} key='2015-16' value='2020-21' name='2015-16'>2015-16</option>
            <option selected={props.season === '2014-15' ? true : false} key='2014-15' value='2014-15' name='2014-15'>2014-15</option>
            <option selected={props.season === '2013-14' ? true : false} key='2013-14' value='2013-14' name='2013-14'>2013-14</option>
            <option selected={props.season === '2012-13' ? true : false} key='2012-13' value='2012-13' name='2012-13'>2012-13</option>
            <option selected={props.season === '2011-12' ? true : false} key='2011-12' value='2011-12' name='2011-12'>2011-12</option>
        </>
    )    
}

export default seasonOptions;