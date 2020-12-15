const MongoClient = require('mongodb');

let db;
let collections = {
    PROVINCES:'provinces',
    REGIONS:'regions'
}

module.exports = {
    connect() {
        MongoClient.connect(process.env.MONGO_URI, {poolSize: 10, useNewUrlParser: true},
            (err, client) => {
                if (err) {
                    console.error("Connection failed to database");
                    process.exit(1);
                }
                console.log("Connected successfully to database");
                db = client.db()
            })
    },
    async saveData(province, regioni) {
        if (province && regioni) {
            db.collection(collections.PROVINCES).deleteMany({})
            db.collection(collections.REGIONS).deleteMany({})
            db.collection(collections.PROVINCES).insertMany(province);
            db.collection(collections.REGIONS).insertMany(regioni);
        }
    },
    async getByProvince(whereClause) {
        return db.collection(collections.PROVINCES).findOne(whereClause);
    },
    async getByRegion(whereClause) {
        return db.collection(collections.REGIONS).findOne(whereClause);
    },
    async getLastRecord(collection, whereClause) {
        return db.collection(collection)
            .find(whereClause)
            .sort({data: -1})
            .limit(1)
            .toArray();
    },
    collections,
};










