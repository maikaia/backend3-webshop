console.log("Initdb.js script starting")
const db = new Mongo().getDB("webshop")

const todos = db.createCollection('todos', { capped: false });
console.log("Created todos collection.")

db.todos.insert([
    { "text": "Hello World!", "timeStamp": new Date().toISOString() },
    { "text": "Hello World!", "timeStamp": new Date().toISOString() },
    { "text": "Hello World!", "timeStamp": new Date().toISOString() },
    { "text": "Hello World!", "timeStamp": new Date().toISOString() },
    { "text": "Hello World!", "timeStamp": new Date().toISOString() },
    { "text": "Hello World!", "timeStamp": new Date().toISOString() },
    { "text": "Hello World!", "timeStamp": new Date().toISOString() },
    { "text": "Hello World!", "timeStamp": new Date().toISOString() },
    { "text": "Hello World!", "timeStamp": new Date().toISOString() },
    { "text": "Hello World!", "timeStamp": new Date().toISOString() },
    { "text": "Hello World!", "timeStamp": new Date().toISOString() },
    { "text": "Hello World!", "timeStamp": new Date().toISOString() },
    { "text": "Hello World!", "timeStamp": new Date().toISOString() },
])

console.log('Initdb.js completed!')