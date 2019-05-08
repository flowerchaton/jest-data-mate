const REDIS_PORT = 6379
const RedisServer = require('redis-server')
const redisServer = new RedisServer(REDIS_PORT)
const redisTools = require('../../tools/redis')
const RedisClient = require('ioredis')
const helpers = require('../../helpers')
const fs = require('fs')

describe('tools:redis', () => {
    beforeAll((done) => {
        redisServer.open(done)
    })
    describe('dump: ({ uri, outputDirPath, db = 0 })', () => {
        test('dump default db', async () => {
            const client = new RedisClient(`localhost:${REDIS_PORT}`)
            await client.hset('k', 'f', 'v1')
            await redisTools.dump({ uri: `localhost:${REDIS_PORT}`, outputDirPath: './tmp' })
            const fileExits = fs.existsSync('./tmp/k')
            expect(fileExits).toBe(true)
        })

        test('dump selected db', async () => {
            const client = new RedisClient(`localhost:${REDIS_PORT}`, { db: 3 })
            await client.hset('k', 'f', 'v1')
            await redisTools.dump({ uri: `localhost:${REDIS_PORT}`, outputDirPath: './tmp', db: 3 })
            const fileExits = fs.existsSync('./tmp/k')
            expect(fileExits).toBe(true)
        })
    })
    afterAll((done) => {
        helpers.findOrRemoveDir('./tmp')
        redisServer.close(done)
    })
})
