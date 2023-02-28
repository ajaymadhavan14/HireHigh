import express from 'express';
import recruiterController from '../controller/recruiterController.js';
import jwtAuth from '../middlewares/jwtAuth.js';

const router = express.Router();

router.post('/signup', recruiterController.recruiterSignUpPost);
router.post('/login', recruiterController.recruiterSignInPost);
router.get('/isRecruiterAuth', jwtAuth.jwtRecruiter, recruiterController.isRecruiterAuth);
router.patch('/blocked', jwtAuth.jwtAdmin, recruiterController.recruiterBlock);
router.patch('/actived', jwtAuth.jwtAdmin, recruiterController.recruiterActive);
router.post('/add_job', jwtAuth.jwtRecruiter, recruiterController.jobPost);
router.get('/get_profile', jwtAuth.jwtRecruiter, recruiterController.getProfile);
router.get('/jobs', jwtAuth.jwtRecruiter, recruiterController.jobsList);
router.get('/get_cat', jwtAuth.jwtRecruiter, recruiterController.getCategoryRec);
router.patch('/job_dele', jwtAuth.jwtRecruiter, recruiterController.DeleteJob);
router.get('/job_edit', jwtAuth.jwtRecruiter, recruiterController.getDataForEdit);
router.post('/edit_job', jwtAuth.jwtRecruiter, recruiterController.EditJobPostData);
router.get('/get_profile_data', jwtAuth.jwtRecruiter, recruiterController.getProfileData);
router.post('/profile_edit_post', jwtAuth.jwtRecruiter, recruiterController.editProfilePost);
router.post('/enter_number', recruiterController.NumberCheck);
router.post('/new_password', recruiterController.setNewPassword);
router.get('/applied_users', jwtAuth.jwtRecruiter, recruiterController.jobAppliedUsers);
router.post('/job_comment', jwtAuth.jwtRecruiter, recruiterController.updateJobComment);

export default router;
