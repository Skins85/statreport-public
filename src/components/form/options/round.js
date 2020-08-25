import React from 'react';

const roundOptions = () => {
    return (
        <React.Fragment>
            <option value="4Q" name="4Q">4Q</option>
            <option value="4Q replay" name="4Q replay">4Q replay</option>
            <option value="1R" name="1R">First Round</option>
            <option value="1R replay" name="1R replay">First Round replay</option>
            <option value="2R" name="2R">Second Round</option>
            <option value="2R replay" name="2R replay">Second Round replay</option>
            <option value="3R" name="3R">Third Round</option>
            <option value="3R replay" name="3R replay">Third Round replay</option>
            <option value="4R" name="4R">Fourth Round</option>
            <option value="4R replay" name="4R replay">Fourth Round replay</option>
            <option value="5R" name="5R">Fifth Round</option>
            <option value="5R replay" name="5R replay">Fifth Round replay</option>
            <option value="QF" name="QF">Quarter-Final</option>
            <option value="QF replay" name="QF replay">Quarter-Final replay</option>
            <option value="SF" name="SF">Semi-Final</option>
            <option value="SF1" name="SF1">Semi-Final (First leg)</option>
            <option value="SF2" name="SF2">Semi-Final (Second leg)</option>
            <option value="Final" name="Final">Final</option>
        </React.Fragment>
    )
}

export default roundOptions;