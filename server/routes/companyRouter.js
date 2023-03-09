import express from 'express';
import companyController from '../controller/companyController.js';
import jwtAuth from '../middlewares/jwtAuth.js';

const router = express.Router();

router.post('/signup', companyController.companySignUpPost);
router.post('/login', companyController.companySignInPost);
router.get('/isCompanyAuth', jwtAuth.jwtCompany, companyController.isCompanyAuth);
router.get('/get_profile', jwtAuth.jwtCompany, companyController.getProfile);

export default router;
