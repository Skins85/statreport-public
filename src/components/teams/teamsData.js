class TeamsData {
    api() {
        return fetch ('https://www.statreport.co.uk/api/json/data-players-goals-all.php')
        .then((response)=> {
            return response.json();
        })
    }
}

export default TeamsData;