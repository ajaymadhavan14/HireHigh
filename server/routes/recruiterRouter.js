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
router.get('/jobs', recruiterController.jobsList);
router.get('/get_cat', recruiterController.getCategoryRec);
router.patch('/job_dele', recruiterController.DeleteJob);
router.get('/job_edit', recruiterController.getDataForEdit);
router.post('/edit_job', recruiterController.EditJobPostData);
router.get('/get_profile_data', recruiterController.getProfileData);
router.post('/profile_edit_post', recruiterController.editProfilePost);

export default router;
