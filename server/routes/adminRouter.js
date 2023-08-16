import express from 'express';
import adminController from '../controller/adminController.js';
import jwtAuth from '../middlewares/jwtAuth.js';

const router = express.Router();

router.post('/login', adminController.signInPost);
router.get('/isAdminAuth', jwtAuth.jwtAdmin, adminController.isAdminAuth);
router.get('/get_users', jwtAuth.jwtAdmin, adminController.getUsersList);
router.get(
  '/get_recruiters',
  jwtAuth.jwtAdmin,
  adminController.getRecruitersList,
);
router.get('/jobs', jwtAuth.jwtAdmin, adminController.getAllJobs);
router.patch('/job_blocked', jwtAuth.jwtAdmin, adminController.jobPostBlock);
router.patch('/job_actived', jwtAuth.jwtAdmin, adminController.jobPostActive);
router.post('/add_category', jwtAuth.jwtAdmin, adminController.AddCategory);
router.get('/job_category', jwtAuth.jwtAdmin, adminController.ShowCategory);
router.delete('/cat_dele', jwtAuth.jwtAdmin, adminController.DeleteCategory);
router.get('/companys', jwtAuth.jwtAdmin, adminController.getCompanys);
router.get('/dashboard', jwtAuth.jwtAdmin, adminController.getDashboard);
router.get(
  '/dashboard-job',
  jwtAuth.jwtAdmin,
  adminController.getDashboardJobList,
);

export default router;
