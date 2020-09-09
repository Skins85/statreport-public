const groupArrayOfObjects = (arr, property) => {
    return arr.reduce(function(memo, x) {
        if (!memo[x[property]]) { memo[x[property]] = []; }
        memo[x[property]].push(x);
        return memo;
    }, {});
}

const nameFormat = (name) => {
    switch(name) {
        case 'Dagenham & Redbridge':
            name = 'Dag & Red';
        break;
        default:
    }
    return name;
}

module.exports = {
    groupArrayOfObjects,
    nameFormat
}