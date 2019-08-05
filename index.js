const express = require('express')

const task = require('./task')

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(task)
app.listen(port,()=>{
    console.log('server on' + port )
})
const Task=require('./modeltask')