const matchReducer = (state = {}, action) => {
    switch (action.type) {
        case "FETCHDATA":
            return state + 1;
        default:
            return state;
    }
}

export default matchReducer;