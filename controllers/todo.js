
const express = require('express');
const verifyToken = require('../middleware/verify-token');
const Todo = require('../models/todo');
const router = express.Router();

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
router.use(verifyToken); //verifies via the middleware that was given to us that the token is valid

router.post('/', async (req, res) => {
    try {
        req.body.author = req.user._id;
        const todo = await Todo.create(req.body);
        todo._doc.author = req.user;
        res.status(201).json(todo)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

router.get('/', async (req, res) => {
    try {

        const todo = await Todo.find({})
            .populate('author') //popuplate the author property with the document object from the user collection
        res.status(200).json(todo);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
});



router.get('/:todoId', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.todoId)
            .populate('author');
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json(error);
    }
});



router.put('/:todoId', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.todoId);

        if (!todo.author.equals(req.user._id)) {
            return res.status(403).send("You're not allowed to do that!");
        }

        const updated = await Todo.findByIdAndUpdate(
            req.params.todoId,
            req.body,
            { new: true }
        );

        updated._doc.author = req.user;

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json(error);
    }
});



router.delete('/:todoId', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.todoId);
        if (!todo.author.equals(req.user._id)) {
            return res.status(403).send("You're not allowed to do that!");
        }

        const deleted = await Todo.findByIdAndDelete(req.params.todoId);
        res.status(200).json(deleted);
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;
