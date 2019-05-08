module.exports = {
    mongodbMemoryServerOptions: {
        instance: {
            dbName: 'test-database'
        },
        binary: {
            version: '4.0.8',
            skipMD5: true
        },
        autoStart: false
    }
};