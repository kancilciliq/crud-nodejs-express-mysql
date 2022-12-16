const express = require('express')
const router = express.Router()
const controllerRouter = require('../controllers/controller-router')
const controllerFood = require('../controllers/controller-food')
const auth = require('../controllers/auth')

router.get('/', controllerRouter.methodGet)
router.post('/', controllerRouter.methodPost)
router.put('/', controllerRouter.methodPut)
router.delete('/', controllerRouter.methodDelete)

//food
router.get('/food', controllerFood.methodGet)
router.get('/food/:id', controllerFood.methodGetById)
router.put('/food/:id', controllerFood.methodPut)
router.post('/food', controllerFood.methodPost)
router.delete('/food/:id', controllerFood.methodDelete)

router.post('/food/upload', controllerFood.methodUploadFile)
router.post('/food/search', controllerFood.methodGetCondition)

//auth
router.post('/register', auth.register)
router.post('/login', auth.login)


module.exports = router;