import express from 'express';
import seekerController from '../controller/seekerController.js';
import jwtAuth from '../middlewares/jwtAuth.js';

const router = express.Router();

router.post('/signup', seekerController.signupPost);
router.post('/login', seekerController.signinPost);
router.get('/isUserAuth', jwtAuth.jwtSeeker, seekerController.isUserAuth);
router.patch('/blocked', jwtAuth.jwtAdmin, seekerController.userBlock);
router.patch('/actived', jwtAuth.jwtAdmin, seekerController.userActive);
router.get('/jobs', jwtAuth.jwtSeeker, seekerController.JobListShow);
router.post('/job_apply', jwtAuth.jwtSeeker, seekerController.jobApply);
router.get('/single_view', jwtAuth.jwtSeeker, seekerController.getSingleView);
router.post('/add_profile', jwtAuth.jwtSeeker, seekerController.AddProfile);
router.get('/get_data', jwtAuth.jwtSeeker, seekerController.getProfileData);
router.get('/profile_search', jwtAuth.jwtSeeker, seekerController.searchProfilData);
router.get('/get_profiledata', jwtAuth.jwtSeeker, seekerController.userDataEditGet);
router.post('/edit_profile_post', jwtAuth.jwtSeeker, seekerController.editUserProfilePost);

export default router;
