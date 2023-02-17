import React from 'react';

const competitionOptions = () => {
    return (
        <React.Fragment>
            <option id="all" selected key='all' value='all' name='all'>All competitions</option>
            <option id="league" value="League" name="League">League</option>
            <option id="playoff" value="Playoff" name="Playoff">Playoff</option>
            <option id="fa-cup" value="FA Cup" name="FA Cup">FA Cup</option>
            <option id="fa-trophy" value="FA Trophy" name="FA Trophy">FA Trophy</option>
            <option id="league-cup" value="League Cup" name="League Cup">League Cup</option>
            <option id="football-league-trophy" value="Football League Trophy" name="Football League Trophy">Football League Trophy</option>
            <option id="essex-senior-cup" value="Essex Senior Cup" name="Essex Senior Cup">Essex Senior Cup</option>
        </React.Fragment>
    )
}

export default competitionOptions;