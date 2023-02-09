
import express from 'express'
import adminController from '../controller/adminControllers.js'

const router = express.Router()

router.post('/login',adminController.signInPost)

export default router