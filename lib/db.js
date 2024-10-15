import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;

/**@type {MongoClient} */
let db;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).

  if (!global._mongo_database) {
    let client = new MongoClient(uri);
    await client.connect()
    console.log("Successfully connected to MongoDB.");
    global._mongo_database = client.db("codefy");

  }
  db = global._mongo_database;
} else {
  // In production mode, it's best to not use a global variable.
  let client = new MongoClient(uri);
  await client.connect()
  db = client.db("codefy");

}



export default db;
