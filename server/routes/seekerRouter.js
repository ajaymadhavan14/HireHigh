
import express from 'express'
import seekerController from '../controller/seekerController.js'
const router = express.Router()


router.post("/signup",seekerController.signupPost)
router.post("/login",seekerController.signinPost)

export default router
