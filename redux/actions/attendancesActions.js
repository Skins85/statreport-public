import { useDispatch, useSelector } from "react-redux";

export const seasonSelect = (data) => {
    return dispatch => {
        dispatch({
            type: "SEASON_SELCTED",
            season: data // Payload key must match action type in reducer
        })
    }
}