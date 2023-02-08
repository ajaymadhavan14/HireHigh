
import express from 'express'
import recruiterController from '../controller/recruiterRouter.js'

const router = express.Router()

router.post('/signup',recruiterController.recruiterSignUpPost)
router.post('/login',recruiterController.recruiterSignInPost)

export default router

