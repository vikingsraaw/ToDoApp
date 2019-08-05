const express = require('express')
const Task = require('./modeltask')
const app=express()
app.use(express.json())
app.post('/list', async (req, res) => {
    const task = new Task(req.body)
    try{
        await task.save()
        res.send(task)
    }catch (e){
        res.send(e)
    }
})
app.get('/list',async(req,res) => {
    try{
      const task =await Task.findAll()
      if (!task){
          return res.send('no task found')
      }
      res.send(task)
    }catch(e){
        res.send(e)
    }
})
app.patch('/list/:id',async(req,res)=>{
    const updates = Object.keys(req.body)
        const Updates=['description','completed']
        const permissonallowed=updates.every((update)=>Updates.includes(update))
        if(!permissonallowed){
            return res.send('permission not granted')
        }
        try{
            const task = await Task.findOne({_id:req.params.id})
            
            updates.foreach((update)=>task[update]=req.body[update])
            await task.save()
            res.send(task)
        }catch(e){
            res.send(e)
        }
})
app.delete('/list/:id',async (req,res)=>{
    try{
        const task =await Task.findOneAndDelete({_id: req.params.id})
        if (!task){
            res.send('invalid')
        }
        res.send(task)
    }catch(e){
        res.send(e)
    }
})
module.exports