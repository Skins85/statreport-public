import React from 'react';

const seasonOptions = () => {
    return (
        <React.Fragment>
            <option value="2020-21" name="2020-21">2020-21</option>
            <option value="2019-20" name="2019-20">2019-20</option>
            <option value="2018-19" name="2018-19">2018-19</option>
            <option value="2017-18" name="2017-18">2017-18</option>
            <option value="2016-17" name="2016-17">2016-17</option>
            <option value="2015-16" name="2015-16">2015-16</option>
            <option value="2014-15" name="2014-15">2014-15</option>
            <option value="2013-14" name="2013-14">2013-14</option>
            <option value="2012-13" name="2012-13">2012-13</option>
        </React.Fragment>
    )
}

export default seasonOptions;