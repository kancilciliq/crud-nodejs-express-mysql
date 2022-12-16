const express = require('express')
const { users } = require('../models')
const bcrypt = require('bcrypt')

const register = async (req,res)=> {
    try {
        const {username, email, password} = req.body

        //bcrypt
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = await bcrypt.hashSync(password, salt)
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
            message: 'eror'
        })
    }
}

const login = async (req,res) => {
    try {
        const{email, password} = req.body
        const checkUser = await users.findOne({
            where: {email:email}
        })
    
        // if(!checkUser){
        //     res.json({
        //         status:400,
        //         message: 'user not found'
        //     })
        // }
        const resultLogin = bcrypt.compareSync(password,checkUser.password)
        if(!resultLogin){
            res.json({
                status:400,
                message: 'email atau password salah'
            })
        }
        return res.json({
            status: 200,
            message: 'succses'
        })
    
    } catch (error) {
        console.error(error)
        res.send('error')
    }
}

module.exports = {
    register,
    login
}