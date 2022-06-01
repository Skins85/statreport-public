const initialState = {
    seasonSelected: ''
}

function attendancesReducer(state = initialState, action) {
    console.log('attendances reducer');
    switch (action.type) {
        case "SEASON_SELCTED":
            return {
                ...state,
                seasonSelected: action.seasonSelected
            };
        default:
            return state;
    }
}

export default attendancesReducer;