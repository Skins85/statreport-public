function matchReducer(state = { data: "" }, action) {
    switch (action.type) {
        case "FETCH_DATA":
            return {
                ...state,
                data: action.data
        };
        case "FETCH_PLAYER_DATA":
            return {
                ...state,
                playerData: action.playerData
        };
    default:
        return state;
    }
}

export default matchReducer;