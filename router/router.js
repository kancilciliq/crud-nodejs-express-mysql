const express = require('express')
const router = express.Router()
const controllerRouter = require('../controllers/controller-router')
const controllerFood = require('../controllers/controller-food')
const auth = require('../controllers/auth')
const verifyToken = require('../middleware/verify-token')

router.get('/', controllerRouter.methodGet)
router.post('/', controllerRouter.methodPost)
router.put('/', controllerRouter.methodPut)
router.delete('/', controllerRouter.methodDelete)

//food
router.get('/food',verifyToken, controllerFood.methodGet)
router.get('/food/:id',verifyToken, controllerFood.methodGetById)
router.put('/food/:id',verifyToken, controllerFood.methodPut)
router.post('/food',verifyToken, controllerFood.methodPost)
router.delete('/food/:id',verifyToken, controllerFood.methodDelete)

router.post('/food/upload',verifyToken, controllerFood.methodUploadFile)
router.post('/food/search',verifyToken, controllerFood.methodGetCondition)

//auth
router.post('/register', auth.register)
router.post('/login',auth.login)


module.exports = router;