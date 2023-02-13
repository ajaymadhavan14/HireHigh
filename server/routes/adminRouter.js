import express from 'express';
import adminController from '../controller/adminController.js';
import jwtAuth from '../middlewares/jwtAuth.js';

const router = express.Router();

router.post('/login', adminController.signInPost);
router.get('/isAdminAuth', jwtAuth.jwtAdmin, adminController.isAdminAuth);
router.get('/get_users', adminController.getUsersList);

export default router;
