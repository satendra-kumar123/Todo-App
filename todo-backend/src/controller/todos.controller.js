import { Todos } from '../model/todos.model.js'

const addTodo = async (req, res) => {
    try {
        const {todo} = req.body
        if(!todo){
            return res.status(402).json({message: "todo not available"})
        }
        if(todo.trim() == "") {
            return res.status().json({
                message: "todo field can not be empty"
            })
        }

        const id = req.user?._id

        const todoItem = await Todos.create({
            content : todo,
            createdBy: id
        })

    
        if(!todoItem) {
            return res.status().json({
                message: "your todo not created"
            })
        }
    
        const todos = await Todos.find({createdBy: id})

    
        if(!todos) {
            return res.status(400).json({message:"todo not available"})
        }
        
        return res.status(200).json({
            message: "accepted todo",
            todos
        })
    } catch (error) {
        res.status(400).json({message: "todo not added"})
        
    }

}

const deleteTodo = async (req, res) => {
    try {
        const {id} = req.params
        console.log(id)
        const todo = await Todos.findByIdAndDelete(id)
        console.log(todo)
        if(!todo) {
            return res.status().json({
                message: "your todo is not deleted"
            })
        }

        const todos = await Todos.find({createdBy: req.user?._id})
        return res.status(200).json({
            message: "todo deleted",
            todos
        })
    } catch (error) {
        res.status(400).json({
            message: error
        })
    }

}

const updateTodo = async (req, res) => {
    try {
        const {editContent, editingId} = req.body
        if(editContent == "") {
            return res.status(400).json({
                message : "empty todo"
            })
        }
        await Todos.findByIdAndUpdate(
            {_id: editingId},
            {$set: {
                content: editContent
            }},
            {returnDocument: true, runValidators: true}
        ) 

        const todos = await Todos.find({createdBy: req.user?._id})

        
        return res.status(200).json({message: "updated", todos})
    } catch (error) {
        return res.status(403).json({
            message: "update todo failed"
        })
    }
}

const isCompleteTodo = async (req, res) => {
    try {
        const { id } = req.params
        const {isComplete:complete} = req.body
        const todo = await Todos.findByIdAndUpdate({_id: id},{$set: {complete}}, {returnDocument: true, runValidators: false})
        
        if(!todo) {
            return res.status(400).json({
                message: "not completed"
            })
        }

        const todos = await Todos.find({createdBy: req.user?._id})

        if(!todos) {
            return res.status(200).json({
                message: "todos not found"
            })
        }

        let message;
        if(complete){
            message = "completed"
        } else {
            message = 'not completed'
        }
        return res.status(200).json({
            message,
            todos
        })
        
    } catch (error) {
        return res.status(405).json({
            message: "something went wrong"
        })
    }
}

export { addTodo, deleteTodo, updateTodo , isCompleteTodo}