import express from 'express';
import companyController from '../controller/companyController.js';
import notificationController from '../controller/notificationController.js';
import jwtAuth from '../middlewares/jwtAuth.js';

const router = express.Router();

router.post('/signup', companyController.companySignUpPost);
router.post('/login', companyController.companySignInPost);
router.get('/isCompanyAuth', jwtAuth.jwtCompany, companyController.isCompanyAuth);
router.get('/get_profile', jwtAuth.jwtCompany, companyController.getProfile);
router.get('/list_jobs', jwtAuth.jwtCompany, companyController.jobList);
router.patch('/job_approval', jwtAuth.jwtCompany, companyController.jobApproval);
router.patch('/job_block', jwtAuth.jwtCompany, companyController.jobBlock);
router.get('/get-notifications', jwtAuth.jwtCompany, notificationController.GetNotification);

export default router;
