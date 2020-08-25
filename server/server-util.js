const db = require('../config/db');


/**
 * Generate placeholder string to match size of data object (for use in SQL statements).
 * 
 * @param {Object} dataObject - Object of data to be processed.
 * @param {String} placeholder - Placeholder string to be used in the query.
 */
const generatePlaceholders = (dataObject, placeholder) => {
    for (let i=0; i < dataObject; i++) {
        placeholder += `?, `
    }
    if (placeholder) {
        placeholder = placeholder.slice(0, -2);
    }
    return placeholder;
}


/**
 * Get column names of table
 * 
 * @param {String} table - Database table name.
 */
const getColumnNames = (table) => {
    let sql = `SELECT COLUMN_NAME
               FROM INFORMATION_SCHEMA.COLUMNS
               WHERE TABLE_NAME = N'${table}'`;
    db.query(sql, (err, results) => {
        if (err) throw err;
    });
}


/**
 * Insert data to database table. 
 * 
 * @param {String} query - SQL statement.
 * @param {Array} values - Values to be added to database table.
 */
const insertData = (query, values) => {
    db.query(query, values, (err, results, fields) => {
        if (err) throw err;
    });
}


/**
 * Segment data object into smaller objects to allow a data object to pass
 * values to multiple tables.
 *
 * @param {Object} dataObject - Data object to be processed.
 * @param {String} table - DB table name.
 */
const targetTableInsert = (dataObject, table) => {

    let allDataKeys = Object.keys(dataObject);
    let multipleTablesField = [];
    let multipleTablesValues = [];
    let multipleTablesObject = {};
    let tableSpecificObject = {};

    for (const a of allDataKeys) {
        let allDataKeyParts = a.split('.');
        let allDataKeyPartsLength = allDataKeyParts.length;
        
        if (allDataKeyPartsLength > 2) {
            // Get table/field string
            // multipleTablesValues = dataObject[a];
            let targetKeys = a.split('.');
            let targetKeysLength = targetKeys.length;
            for (let i=0; i<targetKeysLength-1; i++) {
                multipleTablesField.push(`${targetKeys[i]}.${targetKeys[targetKeysLength-1]}`);
                multipleTablesValues.push(dataObject[a])
            }
            for (const r of multipleTablesField) {
                multipleTablesObject = Object.assign(...multipleTablesField.map((k, i) => ({[k]: multipleTablesValues[i]})))
            }
        } else {
            let tableSpecificKeys = allDataKeys.filter(u => u.startsWith(table));
            let tableSpecificVals = []
            for(const i of tableSpecificKeys){
                tableSpecificVals.push(dataObject[i]);
            }
            for (const r of tableSpecificKeys) {
                tableSpecificObject = Object.assign(...tableSpecificKeys.map((k, i) => ({[k]: tableSpecificVals[i]})))
            }
        }
    }

    let mergedObject = {...multipleTablesObject, ...tableSpecificObject};
    let mergedObjectKeys = Object.keys(mergedObject);
    let mergedObjectFields = [];
    let mergedObjectValues = [];
    
    for (const m of mergedObjectKeys) {
        let mergedObjectKeysParts = m.split('.');
        let mergedObjectKeysPartsLength = mergedObjectKeysParts.length;
        if (mergedObjectKeysPartsLength == 2 && mergedObjectKeysParts[0] == table) {
            mergedObjectFields.push(m);
        }
    }
    for (const n of mergedObjectFields) {
        mergedObjectValues.push(mergedObject[n])
    }
    for (const r of mergedObjectFields) {
        mergedObject = Object.assign(...mergedObjectFields.map((k, i) => ({[k]: mergedObjectValues[i]})))
    }
    console.log(mergedObject);


    // Generate correct number of placeholders based on data object length
    const mergedObjectLength = Object.keys(mergedObject).length;
    let placeholders = '';
    placeholders = generatePlaceholders(mergedObjectLength, placeholders);

    // Build SQL query on data object's key/value pairs
    let objectValues = Object.values(mergedObject);
    let objectKeys = Object.keys(mergedObject).toString();

    let insertQuery = `INSERT INTO ${table} (${objectKeys}) VALUES (${placeholders})`;
    
    insertData(insertQuery, objectValues);
}

module.exports = {
    generatePlaceholders,
    getColumnNames,
    insertData,
    targetTableInsert
}