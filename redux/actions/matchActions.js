import { useDispatch, useSelector } from "react-redux";

import axios from 'axios';

export const fetchMatchesData = (data) => {
    return dispatch => {
        dispatch({
            type: "FETCH_MATCHES_DATA",
            matchesData: data
        })
    }
}

export const fetchPlayersData = (data) => {
    return dispatch => {
        dispatch({
            type: "FETCH_PLAYERS_DATA",
            playersData: data
        })
    }
}

export const fetchAssistsData = (data) => {
    return dispatch => {
        dispatch({
            type: "FETCH_ASSISTS_DATA",
            assistsData: data
        })
    }
}