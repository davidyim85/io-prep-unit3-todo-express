///////////////////////////////////////////////
//////// TODO model                   ///////// 
///////////////////////////////////////////////

//import the mongoose VARIABLE which holds the configuration on the file called connection.js
const mongoose = require('./connection.js');


//created our SCHEMA. 
//its called 'TodoSchema' and there are three fields in this schema
//text which is a string, isComplete which is a boolean and duration which is a number
const TodoSchema = new mongoose.Schema({
    text: { type: String, required: true, },
    isComplete: { type: Boolean, required: true, },
    duration: { type: Number, required: true, },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' //this needs to be the SAME SPELLING SAME CASE as in the mongoose.model 'user'
    },
});

//create a variable that create a model from the schema variable this variable will be the 'thing' 
//that is used to define our records in the collection
const Todo = mongoose.model('todo', TodoSchema);


//export out that Todo variable (we called it the thing above)
module.exports = Todo;