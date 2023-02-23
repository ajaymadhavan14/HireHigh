import express from 'express';
import seekerController from '../controller/seekerController.js';
import jwtAuth from '../middlewares/jwtAuth.js';

const router = express.Router();

router.post('/signup', seekerController.signupPost);
router.post('/login', seekerController.signinPost);
router.get('/isUserAuth', jwtAuth.jwtSeeker, seekerController.isUserAuth);
router.patch('/blocked', seekerController.userBlock);
router.patch('/actived', seekerController.userActive);
router.get('/jobs', seekerController.JobListShow);
router.post('/job_apply', seekerController.jobApply);
router.get('/single_view', seekerController.getSingleView);
router.post('/add_profile', seekerController.AddProfile);
router.get('/get_data', seekerController.getProfileData);
router.get('/profile_search', seekerController.searchProfilData);
router.get('/get_profiledata', seekerController.userDataEditGet);

export default router;
