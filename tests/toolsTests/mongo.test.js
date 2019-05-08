const mongoTools = require('../../tools/mongo')
const testUtils = require('../utils')
const helpers = require('../../helpers')
const fs = require('fs')
const dataFolder = '.tmp'

describe('tools:mongo', () => {
    describe('dump: ({ uri, collectionNames, outDirPath })', () => {
        afterEach(() => testUtils.getDb().then(db => db.dropDatabase()))

        test('dump some collections', async () => {
            const c1 = await testUtils.getCollection('c1')
            const c2 = await testUtils.getCollection('c2')
            try {
                await c1.insertMany([{ k1: 'v1', k2: 'v2' }])
                await c2.insertMany([{ k1: 'v1', k2: 'v2' }])
                mongoTools.dump({ uri: process.env.MONGO_URL, collectionNames: ['c1'], outDirPath: dataFolder })

                const exists1 = fs.existsSync(`${dataFolder}/test-database/c1.metadata.json`)
                const exists2 = fs.existsSync(`${dataFolder}/test-database/c1.bson`)
                expect(exists1 && exists2).toBe(true)
                helpers.findOrRemoveDir(dataFolder)
            } catch (error) {
                console.log('error: ', error);
            }
        })

        test('dump all collections', async () => {
            const c1 = await testUtils.getCollection('c1')
            const c2 = await testUtils.getCollection('c2')
            try {
                await c1.insertMany([{ k1: 'v1', k2: 'v2' }])
                await c2.insertMany([{ k1: 'v1', k2: 'v2' }])
                mongoTools.dump({ uri: process.env.MONGO_URL, outDirPath: dataFolder })

                const exists1 = fs.existsSync(`${dataFolder}/test-database/c1.metadata.json`)
                const exists2 = fs.existsSync(`${dataFolder}/test-database/c1.bson`)
                const exists3 = fs.existsSync(`${dataFolder}/test-database/c2.metadata.json`)
                const exists4 = fs.existsSync(`${dataFolder}/test-database/c2.bson`)
                expect(exists1 && exists2 && exists3 && exists4).toBe(true)
                helpers.findOrRemoveDir(dataFolder)
            } catch (error) {
                console.log('error: ', error);
            }
        })
    })

    // describe('restore: ({ uri, collectionNames, inDirPath })', () => {
    //     afterEach(() => testUtils.getDb().then(db => db.dropDatabase()))

    //     try {
    //         await c1.insertMany([{ k1: 'v1', k2: 'v2' }])
    //         mongoTools.dump({ uri: process.env.MONGO_URL, collectionNames: ['c1'], outDirPath: dataFolder })
            
    //         expect(exists1 && exists2).toBe(true)
    //         helpers.findOrRemoveDir(dataFolder)
    //     } catch (error) {
    //         console.log('error: ', error);
    //     }
    // })

})
