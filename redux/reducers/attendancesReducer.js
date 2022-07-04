const initialState = {
    season: ''
}

function attendancesReducer(state = initialState, action) {
    switch (action.type) {
        case "SEASON_SELCTED":
            return {
                ...state,
                season: action.season, // key must match key in initialState object, value must match action type
            };
        default:
            return state;
    }
}

export default attendancesReducer;