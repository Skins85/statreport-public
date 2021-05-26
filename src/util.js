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

/**
 * Generate object of array value instances, 
 * e.g. [apple, apple, orange] returns {apple: 2, orange: 1}
 *
 * @param {Array} arr - The initial array of data.
 * @param {Object} obj - The object created.
 **/
const arrayInstancesToObject = (arr, obj) => {
    for (let i = 0, j = arr.length; i < j; i++) {
        obj[arr[i]] = (obj[arr[i]] || 0) + 1;
    }
}

/**
 * Convert object totals into array and sort
 * e.g. { balanta_angelo: 2, wilkinson_conor: 3, ... }
 * Result => 0: (2) ["wilkinson_conor", 3]
 *           1: (2) ["balanta_angelo", 2]
 *
 * @param {Object} obj - The initial object of data.
 * @param {Array} arr - The array created.
 * @param {String} sort - The sort direction.
 **/
const objectInstancesToArray = (obj, arr, sort) => {
    for (const o in obj) {
        arr.push([o, obj[o]]);
    }
    sort === 'desc' ? arr.sort((a, b) => b[1] - a[1]) : arr.sort((a, b) => a[1] - b[1]);    
}

/**
 * Filter data on a key matching a value.
 *
 * @param {Object} res - The filtered object.
 * @param {Array} data - The source array. This could be an array of objects.
 * @param {String} key - The name of the key.
 * @param {String} val - The value to filter on.
 **/
const filterArrayofObjects = (data, key, val) => {
    return data ? data.filter((r) => r[key] === val) : null;
}

const toggleState = (el, setStateRef, value, defaultText, toggledText) => {
    setStateRef(!value);
    el.target.innerText === defaultText 
        ? (el.target.innerText = toggledText) && (el.target.className = 'toggle toggle--closed')
        : (el.target.innerText = defaultText) && (el.target.className = 'toggle toggle--open');
}

const playerStartsFilter = (data, player_id) => {
    if (data) {
        let filteredArray = data.filter(function (d) {
            return  (
                d.player_1 === player_id || 
                d.player_2 === player_id ||
                d.player_3 === player_id ||
                d.player_4 === player_id ||
                d.player_5 === player_id ||
                d.player_6 === player_id ||
                d.player_7 === player_id ||
                d.player_8 === player_id ||
                d.player_9 === player_id ||
                d.player_10 === player_id ||
                d.player_11 === player_id 
            );
        });
        return filteredArray;
    }
}

const playerSubsFilter = (data, player_id) => {
    if (data) {
        let filteredArray = data.filter(function (d) {
            return  (
                d.sub_1 === player_id || 
                d.sub_2 === player_id ||
                d.sub_3 === player_id ||
                d.sub_4 === player_id ||
                d.sub_5 === player_id
            );
        });
        return filteredArray;
    }
}

module.exports = {
    groupArrayOfObjects,
    nameFormat,
    arrayInstancesToObject,
    objectInstancesToArray,
    filterArrayofObjects,
    toggleState,
    playerStartsFilter,
    playerSubsFilter
}