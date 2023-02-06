
import express from 'express'
import seekerController from '../controller/seekerController.js'
const router = express.Router()


router.post("/signup",seekerController.signupPost)

export default router
