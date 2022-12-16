const express = require('express')
const {menu} = require('../models')
const {photos} = require('../models')
const upload = require('../helper/file-upload')
const { Op } = require('sequelize')

//query condition
const methodGetCondition = async (req,res)=> {
    const param1 = req.body.masakan
    const param2 = req.body.daerah
    try {
        const getData = await menu.findAll({
            attributes: [['masakan', 'nama'], ['daerah', 'daerah']],
            order: [['masakan', 'asc']]
            // where: {
            //     [Op.or]:[ 
            //         {masakan: param1},
            //         {daerah: param2}
            //     ]
                //     [Op.and]:[
                //         {masakan: param1}, 
                //         {daerah: param2}
                // ]
                // masakan: {
                //     [Op.like]:'%'+param1+'%'
                // }
            // }
        })
        res.json(getData)
    } catch (error) {
        res.json({
            status: 400,
            message: 'error'
        })
    }
}

const methodUploadFile = async (req,res)=> {
    try {
    await upload(req,res)
    if(req.file == undefined){
        console.error(req.file)
        return res.json({
            message: 'erorrrr'
        })
    }

    //konek DB
    const {idmenu, path} = req.body
    const addPhoto = await photos.create({
        idmenu: req.body.idmenu,
        path: req.file.originalname
    }).then((data)=> {
        res.status(200).send({message: 'succses upload file'})
    })

    } catch (error) {
        console.error(error.message)
        res.send('error')
    }
}

const methodPost = async (req,res) => {
    try {
        const {masakan,daerah,deskripsi} = req.body;
        const addMenu = await menu.create(req.body)
        
        res.json({
            message: "succses create menu",
            data: addMenu
        })

    } catch (error) {
        console.error(error.message)
        res.status(500).send('terjadi kesalahan')
    }
}

const methodGet = async (req,res)=> {
    try {
        const getMenu = await menu.findAll()
        return res.json({
            message: 'succses get all menu',
            status: 200,
            data: getMenu
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('terjadi kesalahan')
    }
}

const methodGetById = async (req,res)=>{
    try {
        const id = req.params.id
        const getMenuId = await menu.findByPk(id)
        return res.json({
            message: 'succses get menu by id',
            status: 200,
            data:getMenuId
        })
        
    } catch (error) {
        console.error(error.message)
        res.json({
            message: 'data not found',
            status: 401
        })
    }
}

const methodPut = async (req,res) => {
    try {
        const {masakan,daerah,deskripsi} = req.body;
        const id = req.params.id

        const updateMenu = await menu.update({
            masakan,daerah,deskripsi
        },{
            where: {id:id}
        })

        return res.json({
            message: 'succsec update menu',
            status: 200
        })
    } catch (error) {
        console.error(error.message)
        res.json({
            message: 'eror'
        })
    }
}

const methodDelete = async (req,res)=> {
    try {
        const id = req.params.id

        const deleteMenu = await menu.destroy({
            where: {id:id}
        })

        return res.json({
            message: 'succsec delete menu',
            status: 200
        })
    } catch (error) {
        console.error(error.message)
        res.json({
            message: 'eror'
        })
    }

}

module.exports = {
    methodPost,
    methodGet,
    methodGetById,
    methodPut,
    methodDelete,
    methodUploadFile,
    methodGetCondition
}