import React from 'react';

const competitionOptions = () => {
    return (
        <React.Fragment>
            <option selected key='all' value='all' name='all'>All competitions</option>
            <option value="League" name="League">League</option>
            <option value="Playoff" name="Playoff">Playoff</option>
            <option value="FA Cup" name="FA Cup">FA Cup</option>
            <option value="FA Trophy" name="FA Trophy">FA Trophy</option>
            <option value="League Cup" name="League Cup">League Cup</option>
            <option value="Football League Trophy" name="Football League Trophy">Football League Trophy</option>
            <option value="Essex Senior Cup" name="Essex Senior Cup">Essex Senior Cup</option>
        </React.Fragment>
    )
}

export default competitionOptions;