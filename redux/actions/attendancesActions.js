import { useDispatch, useSelector } from "react-redux";

export const attendancesDataFeed = (data) => {
    return dispatch => {
        dispatch({
            type: "ATTENDANCES_DATA_FEED",
            attendancesDataFeed: data
        })
    }
}

export const seasonSelect = (data) => {
    return dispatch => {
        dispatch({
            type: "SEASON_SELCTED",
            seasonSelected: data // Payload key must match action type in reducer
        })
    }
}