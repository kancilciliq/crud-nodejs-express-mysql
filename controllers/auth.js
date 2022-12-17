const express = require('express')
const { users } = require('../models')
const bcrypt = require('bcrypt')
const {validation} = require('../middleware/validation')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()


const register = async (req,res)=> {
    try {
        const {username, email, password} = req.body

        //form validation
        const validate = validation(req.body)
        if(validate.length){
            return res.status(400).json(validate)
        } 
        
        //bcrypt
        const salt = await bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)
        const Users = new users({
            username: username,
            email: email,
            password: hashPassword
        })

        const saveUser = await Users.save(req.body)
        return res.json({
            status: 200,
            message: 'succses',
            data: saveUser
        })
    } catch (error) {
        console.error(error)
        res.json({
            message: 'catch eror'
        })
    }
}

const login = async (req,res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const checkUser = await users.findOne({where:{email:req.body.email}})
        
        if(!checkUser) res.status(400).send('user not found')
        const resultLogin = bcrypt.compareSync(password, checkUser.password)

        if(!resultLogin) res.status(400).send('something was wrong')

        //token
        const token = jwt.sign({_email: checkUser.email},process.env.TOKEN_RAHASIA)

        res.header('auth-token', token).send('login berhasil')
        
    } catch (error) {
        console.error(error)
        return res.send('error')
    }
}

module.exports = {
    register,
    login
}