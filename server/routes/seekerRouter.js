import express from 'express';
import seekerController from '../controller/seekerController.js';
import jwtAuth from '../middlewares/jwtAuth.js';

const router = express.Router();

router.post('/signup', seekerController.signupPost);
router.post('/login', seekerController.signinPost);
router.get('/isUserAuth', jwtAuth.jwtSeeker, seekerController.isUserAuth);

export default router;
