import { useDispatch, useSelector } from "react-redux";

import axios from 'axios';

export const getData = () => {
    return dispatch => {
        axios.get("https://www.statreport.co.uk/api/json/data-matches.php")
            .then(res =>
            dispatch({
                type: "FETCH_DATA",
                data: res.data
            })
        );
    };
}

export const getPlayerData = () => {
    return dispatch => {
        axios.get("https://www.statreport.co.uk/api/json/data-players.php")
            .then(res =>
            dispatch({
                type: "FETCH_PLAYER_DATA",
                playerData: res.data
            })
        );
    };
}