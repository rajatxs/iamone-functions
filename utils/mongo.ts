import {
   MongoClient,
   Db,
   CollectionOptions,
   Collection as MongoCollection,
   Document,
   InsertOneOptions,
   UpdateOptions,
   DeleteOptions,
   OptionalId,
   ObjectId,
   Filter,
} from 'mongodb'

let db: Db, client: MongoClient

/**
 * Returns `Db` connection object
 */
export async function Connect(): Promise<Db> {
   if (db) {
      console.log("MongoDB", "Using existing connection")
      return db
   }

   console.log("MongoDB", "Creating new connection")
   client = await MongoClient.connect(process.env.MONGO_CONNECTION_URL)
   db = client.db(process.env.MONGO_DATABASE_NAME)

   return db
}

/**
 * Close the `MongoClient` connection
 */
export async function Disconnect() {
   if (client) {
      return await client.close()
   }
}

/**
 * Returns `ObjectId`
 */
export function Id(id: string | ObjectId) {
   return (id instanceof ObjectId)? id: new ObjectId(id)
}

/**
 * Returns collection object of `Db`
 */
export function Collection(name: string, options?: CollectionOptions) {
   return db.collection(name, options)
}

/**
 * Returns multiple documents followed by `filter` from `coll`
 */
export function Find<T>(coll: MongoCollection<Document>, filter: Filter<T>) {
   return new Promise((resolve, reject) => {
      coll
         .find(filter)
         .toArray((error, result) => {
            if (error) {
               return reject(error)
            }

            resolve(result)
         })
   })
}

/**
 * Returns single document from `coll`
 */
export function FindOne<T>(coll: MongoCollection<Document>, filter: Filter<T>) {
   return new Promise((resolve, reject) => {
      coll.findOne(filter, (error, result) => {
         if (error) {
            return reject(error)
         }

         resolve(result)
      })
   })
}

/**
 * Inserts a single document into `coll`
 */
export function Insert(coll: MongoCollection<Document>, doc: OptionalId<Document>, options?: InsertOneOptions) {
   return coll.insertOne(doc, options)
}

/**
 * Update a single document in a `coll`
 */
export function Update<T>(coll: MongoCollection<Document>, filter: Filter<T>, update: OptionalId<Document>, options?: UpdateOptions) {
   return coll.updateOne(filter, update, options)
}

/**
 * Delete a document from a `coll`
 */
export function Delete<T>(coll: MongoCollection<Document>, filter: Filter<T>, options?: DeleteOptions) {
   return coll.deleteOne(filter, options)
}
