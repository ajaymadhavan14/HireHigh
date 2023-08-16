import express from 'express';
import recruiterController from '../controller/recruiterController.js';
import jwtAuth from '../middlewares/jwtAuth.js';
import notificationController from '../controller/notificationController.js';

const router = express.Router();

router.post('/signup', recruiterController.recruiterSignUpPost);
router.post('/login', recruiterController.recruiterSignInPost);
router.get(
  '/isRecruiterAuth',
  jwtAuth.jwtRecruiter,
  recruiterController.isRecruiterAuth,
);
router.patch('/blocked', jwtAuth.jwtAdmin, recruiterController.recruiterBlock);
router.patch('/actived', jwtAuth.jwtAdmin, recruiterController.recruiterActive);
router.post('/add-job', jwtAuth.jwtRecruiter, recruiterController.jobPost);
router.get(
  '/get-profile',
  jwtAuth.jwtRecruiter,
  recruiterController.getProfile,
);
router.get('/jobs', jwtAuth.jwtRecruiter, recruiterController.jobsList);
router.get(
  '/get-cat',
  jwtAuth.jwtRecruiter,
  recruiterController.getCategoryRec,
);
router.patch('/job-dele', jwtAuth.jwtRecruiter, recruiterController.DeleteJob);
router.get(
  '/job-edit',
  jwtAuth.jwtRecruiter,
  recruiterController.getDataForEdit,
);
router.post(
  '/edit-job',
  jwtAuth.jwtRecruiter,
  recruiterController.EditJobPostData,
);
router.get(
  '/get-profile-data',
  jwtAuth.jwtRecruiter,
  recruiterController.getProfileData,
);
router.post(
  '/profile-edit-post',
  jwtAuth.jwtRecruiter,
  recruiterController.editProfilePost,
);
router.post('/enter-number', recruiterController.NumberCheck);
router.post('/new-password', recruiterController.setNewPassword);
router.get(
  '/applied-users',
  jwtAuth.jwtRecruiter,
  recruiterController.jobAppliedUsers,
);
router.post(
  '/job-comment',
  jwtAuth.jwtRecruiter,
  recruiterController.updateJobComment,
);
router.get(
  '/get-sorted-user',
  jwtAuth.jwtRecruiter,
  recruiterController.getSortedList,
);
router.get(
  '/allDatas',
  jwtAuth.jwtRecruiter,
  recruiterController.getAllDatasRecruiterSide,
);
router.get(
  '/get-companyData',
  jwtAuth.jwtRecruiter,
  recruiterController.getCompanyDataForJob,
);
router.get('/get-company', recruiterController.getCompanyDetails);
router.post(
  '/add-notification',
  jwtAuth.jwtRecruiter,
  notificationController.AddNotification,
);
router.get(
  '/get-notifications',
  jwtAuth.jwtRecruiter,
  notificationController.GetNotification,
);

router.get('/user/:id', recruiterController.getUserForChat);

export default router;
