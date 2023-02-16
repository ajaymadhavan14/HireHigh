import express from 'express';
import adminController from '../controller/adminController.js';
import jwtAuth from '../middlewares/jwtAuth.js';

const router = express.Router();

router.post('/login', adminController.signInPost);
router.get('/isAdminAuth', jwtAuth.jwtAdmin, adminController.isAdminAuth);
router.get('/get_users', adminController.getUsersList);
router.get('/get_recruiters', adminController.getRecruitersList);
router.get('/jobs', adminController.getAllJobs);
router.patch('/job_blocked', adminController.jobPostBlock);
router.patch('/job_actived', adminController.jobPostActive);
router.post('/add_category', adminController.AddCategory);
router.get('/job_category', adminController.ShowCategory);
router.patch('/cat_dele', adminController.DeleteCategory);

export default router;
