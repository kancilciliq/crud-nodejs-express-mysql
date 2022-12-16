const express = require('express')
const app = express()
const router = require('./router/router')

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/', router)

app.listen(5000, ()=>{
    console.log('server menyala')
})