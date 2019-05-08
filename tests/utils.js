let connection
let db
const MongoClient = require('mongodb').MongoClient

module.exports = {
    getDb: async () => {
        if (!connection) {
            connection = await MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true });
        }
        if (!db) {
            db = await connection.db('test-database');
        }
        return db
    },

    getCollection: async (name) => {
        try {
            if (!connection) {
                connection = await MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true });
            }
            if (!db) {
                db = await connection.db('test-database');
            }
            return db.collection(name)
        } catch (error) {
            console.log('error: ', error);
        }
    }
}