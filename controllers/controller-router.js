const express = require('express')

const methodGet = (req,res)=> {
    res.send('ini method get')
}

const methodPost = (req,res)=> {
    res.send('ini method post')
}

const methodPut = (req,res)=> {
    res.send('ini method put')
}

const methodDelete = (req,res)=> {
    res.send('ini method delete')
}


module.exports = {
    methodGet,
    methodPost,
    methodPut,
    methodDelete
}