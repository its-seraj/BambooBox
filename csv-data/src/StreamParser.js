const validator = require('validator')

const putFile = (rows) => {
    const validData = [], invalidData = [];

    rows.forEach((row) => {
        isValid(row) ? validData.push(row) : invalidData.push(row);
    })
    return {validData, invalidData};
}

const isValid = (row) => {
    for (const property in row) row[property] = row[property].trim()

    
    if (!row.name || !row.organization || !row.designation || !row.email || !row.website || !row.date) return false;
    
    if (!validator.isEmail(row.email)) return false;
    
    // convert dateformat
    if(isValidDate(row.date)) row.date = isValidDate(row.date); // change if not false
    else return false;

    if (!validator.isURL(row.website)) return false;

    return true;
}

const isValidDate = (dateString) => {
    try {
        const date = new Date(dateString)

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`
    }catch(e){
        return false;
    }
}

module.exports = {
    putFile,
}