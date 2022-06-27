// Global variables
const variables = {
    DATA_SEASON_START: '2011/12',
    BASE_URL: process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://www.statreport.co.uk'
};

export { variables };