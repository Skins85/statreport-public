export const fetchMatches = () => dispatch => {
    fetch('https://www.statreport.co.uk/api/json/data-matches.php')
        .then(res => res.json())
        .then(matches =>
            dispatch({
                type: "FETCH_MATCHES",
                payload: matches,
            })
        );
};