const initialState = {
    seasonSelected: '',
    attendancesDataFeed: ''
}

function attendancesReducer(state = initialState, action) {
    switch (action.type) {
        case "SEASON_SELCTED":
            return {
                ...state,
                seasonSelected: action.seasonSelected, // key must match key in initialState object, value must match action type
            };
        case "ATTENDANCES_DATA_FEED":
            return {
                ...state,
                attendancesDataFeed: action.attendancesDataFeed,
            };
        default:
            return state;
    }
}

export default attendancesReducer;