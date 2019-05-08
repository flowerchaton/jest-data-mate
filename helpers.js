const fs = require('fs')
const cp = require('child_process')

const commandExists = require('command-exists').sync;
module.exports = {
    checkCommandAvaliable: (commandName) => {
        if (!commandExists(commandName)) {
            throw new Error(`${commandName} is not avaliable`)
        }
    },

    findOrCreateDir: path => {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
    },
    findOrRemoveDir: path => {
        if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
            cp.execSync(`rm -rf ${path}`);
        }
    },
}