import { useDispatch, useSelector } from "react-redux";

export const attendancesData = (data) => {
    return dispatch => {
        dispatch({
            type: "ATTENDANCES_DATA",
            attendancesData: data
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