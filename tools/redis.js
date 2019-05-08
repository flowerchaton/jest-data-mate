const cp = require('child_process')
const Redis = require('ioredis');
const helpers = require('../helpers')
const fs = require('fs')

module.exports = {
    dump: async ({ uri, outputDirPath, db = 0 }) => {
        const client = new Redis(uri, { db })
        helpers.findOrCreateDir(outputDirPath);

        const keys = await client.keys('*');
        for (const key of keys) {
            const type = await client.type(key);
            if (type === 'hash') {
                const data = await client.hgetall(key);
                fs.writeFileSync(`${outputDirPath}/${key}`, JSON.stringify({ data, type }));
            } else if (type === 'string') {
                const data = await client.get(key);
                fs.writeFileSync(`${outputDirPath}/${key}`, JSON.stringify({ data, type }));
            }
        }
        client.disconnect()
    },

    restore: ({ uri, inputDirPath, db = 0 }) => {
        const client = new Redis(uri, { db })
        const files = fs.readdirSync(inputDirPath);

        return Promise.all(
            files.map(key => {
                if (key[0] !== '.') {
                    const buffer = fs.readFileSync(`${dirPath}/${key}`);
                    const stringData = buffer.toString();
                    const jsonData = JSON.parse(stringData);
                    if (jsonData.type === 'hash') {
                        const dataEntries = Object.entries(jsonData.data);
                        const dataArr = [];
                        dataEntries.forEach(entry => dataArr.push(...entry));
                        return client.hmset(key, dataArr);
                    }
                    if (jsonData.type === 'string') {
                        return client.set(key, jsonData.data);
                    }
                }
                return null;
            }),
        );
    },

    clean: ({ uri, db }) => {
        const client = new Redis(uri, { db })
        if (db) {
            return client.flushdb()
        }
        return client.flushall()
    }
}