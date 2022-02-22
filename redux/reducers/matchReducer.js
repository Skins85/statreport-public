function matchReducer(state = {dataLoaded: false}, action) {
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
        case "FETCH_PLAYERS_GOALS_DATA":
            return {
                ...state,
                playersGoalsData: action.playersGoalsData
        };
        case "FETCH_OPPOSITION_OWN_GOALS_DATA":
            return {
                ...state,
                oppositionOwnGoalsData: action.oppositionOwnGoalsData
        };
        case "FETCH_OPPOSITION_GOALS_DATA":
            return {
                ...state,
                oppositionGoalsData: action.oppositionGoalsData
        };
        case "DATA_LOADED":
            return {
                ...state,
                dataLoaded: action.dataLoaded
        };
    default:
        return state;
    }
}

export default matchReducer;