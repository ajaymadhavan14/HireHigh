import express from 'express';
import recruiterController from '../controller/recruiterController.js';
import jwtAuth from '../middlewares/jwtAuth.js';

const router = express.Router();

router.post('/signup', recruiterController.recruiterSignUpPost);
router.post('/login', recruiterController.recruiterSignInPost);
router.get('/isRecruiterAuth', jwtAuth.jwtRecruiter, recruiterController.isRecruiterAuth);
router.patch('/blocked', recruiterController.recruiterBlock);
router.patch('/actived', recruiterController.recruiterActive);
router.post('/add_job', recruiterController.jobPost);
router.get('/get_profile', recruiterController.getProfile);

export default router;
