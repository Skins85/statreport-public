function matchReducer(state = {}, action) {
    switch (action.type) {
        case "FETCH_MATCHES_DATA":
            return {
                ...state,
                matchesData: action.matchesData
        };
        case "FETCH_PLAYERS_DATA":
            return {
                ...state,
                playersData: action.playersData
        };
        case "FETCH_ASSISTS_DATA":
            return {
                ...state,
                assistsData: action.assistsData
        };
    default:
        return state;
    }
}

export default matchReducer;