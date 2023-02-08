// const mongodb = require('mongodb')

// const mc = mongodb.MongoClient

// const connectionURL = 'mongodb://localhost:27017'
// const database = 'task-manager'

// mc.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
//     if(error){
//         return console.log('Unable to connect database.')
//     }

//     console.log('DB Connection successful.');

//     const db = client.db(database)

//     db.collection('users').insertOne({
//         name: 'Andrew',
//         age: 27,
//     })
// })

const { MongoClient, ObjectID } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

const id = new ObjectID();
console.log(id)
console.log(id.getTimestamp())

// Database Name
const dbName = 'task-manager';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('users');
    // collection.insertOne({
    //       name: 'Andrew',
    //       age: 27,
    //   }, (error, result) => {
    //       if(error) return console.log('Unable to isert.')

    //       console.log(result)
    //   })
  //     collection.insertMany([
  //         {
  //             name: 'Rehan',
  //             age: 21,
  //         },
  //         {
  //             name: 'Madhu',
  //             age: 22,
  //         }
  //     ], (error, result) => {
  //         if(error) return console.log('Unable to isert.')

  //         console.log(result)
  //     })

  const description = db.collection('description')
  // description.insertMany([
  //     {
  //         description: 'Buy apple by evening',
  //         completed: false
  //     },
  //     {
  //         description: 'Meet with friend',
  //         completed: true
  //     },
  //     {
  //         description: 'Send an email to HR',
  //         completed: false
  //     }
  // ])

  // collection.findOne({ name: 'Andrew' }, (error, user) => {
  //   if (error) {
  //     return console.log('Unable to fetch.')
  //   }

  //   console.log(user)
  // })
  // collection.findOne({ _id: new ObjectID('63e237350b38332698253852') }, (error, user) => {
  //   if (error) {
  //     return console.log('Unable to fetch.')
  //   }

  //   console.log(user)
  // })
  // tasks
  // description.findOne({_id: new ObjectID('63e240c28f2d4c198085f679')}, (error, task) => {
  //   if(error) return console.log('Unable to fetch.')

  //   console.log(task)
  // })
  // description.find({completed: false}).toArray((error, arr) => {
  //   if(error) return console.log('Unable to fetch')

  //   console.log(arr)
  // })
  // description.find({completed: false}).count((error, count) => {
  //   if(error) return console.log('Unable to count')

  //   console.log(count)
  // })

  // collection.updateOne({
  //   _id: new ObjectID('63e234dcf7a0132f6479512b')
  // }, {
  //   $set: {
  //     name: 'Gulshan'
  //   },
  //   $inc: {
  //     age: 1
  //   }
  // }).then((result) => console.log(result)).catch((error) => console.log(error));

  // description.updateMany({
  //   completed: true
  // }, {
  //   $set: {
  //     completed: false
  //   }
  // }).then((result) => console.log(result)).catch((error) => console.log(error))

  // collection.deleteMany({
  //   age: 27
  // }).then((result) => console.log(result.deletedCount)).catch((error) => console.log(error))
  collection.deleteOne({
    age: 27
  }).then((result) => console.log(result.deletedCount)).catch((error) => console.log(error))

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());