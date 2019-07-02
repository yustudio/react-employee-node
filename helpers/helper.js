const fs = require('fs')
const path = require("path");
const uuidv1 = require('uuid/v1');

const getNewId = (array) => {
    return uuidv1();
}
const newDate = () => new Date().toString()

function mustBeInArray(array, id) {
    return new Promise((resolve, reject) => {
        const row = array.find(r => r.id === id)
        if (!row) {
            reject({
                message: 'ID is not valid or doesn\'t exist',
                status: 404
            })
        }
        resolve(row)
    })
}
function writeJSONFile(filename, content) {
    fs.writeFileSync(path.resolve(__dirname, filename), JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}

module.exports = {
    getNewId,
    newDate,
    mustBeInArray,
    writeJSONFile
}