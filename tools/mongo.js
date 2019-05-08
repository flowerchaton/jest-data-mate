const cp = require('child_process')
const helpers = require('../helpers')
module.exports = {
    dump: ({ uri, collectionNames, outDirPath }) => {
        helpers.checkCommandAvaliable('mongodump')
        helpers.findOrCreateDir(outDirPath)
        if (collectionNames && collectionNames.length !== 0) {
            for (const name of collectionNames) {
                cp.execSync(`mongodump --uri ${uri} -o ${outDirPath} -c ${name}`)
            }
        } else {
            cp.execSync(`mongodump --uri ${uri} -o ${outDirPath}`)
        }
    },

    restore: ({ uri, collectionNames, inDirPath }) => {
        helpers.checkCommandAvaliable('mongorestore')
        if (collectionNames && collectionNames.length !== 0) {
            for (const name of collectionNames) {
                childProcess.execSync(`mongorestore --uri ${uri} --dir ${inDirPath} -c ${name}`)
            }
        } else {
            childProcess.execSync(`mongorestore --uri ${uri} --dir ${inDirPath}`)
        }
    },

    clean: ({ uri, collectionNames }) => {
        if (collectionNames && collectionNames.length !== 0) {
            for (const name of collectionNames) {
                cp.execSync(`mongo ${uri} --eval 'db.dropCollection("${name}")'`)
            }
        } else {
            cp.execSync(`mongo ${uri} --eval 'db.dropDatabase()'`)
        }
    }
}