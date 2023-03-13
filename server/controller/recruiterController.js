/* eslint-disable no-underscore-dangle */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import recruiterModel from '../model/recruiterSchema.js';
import jobPostModel from '../model/jobPostSchema.js';
import categoryModel from '../model/jobCategorySchema.js';
import userModel from '../model/userSchema.js';
import companyModel from '../model/companySchema.js';

const recruiterSignUpPost = async (req, res, next) => {
  try {
    const {
      userName, phoneNumber, companyName, email, tagLine, discription,
      website, password, image,
    } = req.body;
    const recruiter = await recruiterModel.findOne({ email });
    const number = await recruiterModel.findOne({ phoneNumber });
    if (recruiter) {
      res.json({ status: 'failed', message: 'Email already exist login now' });
    } else if (number) {
      res.json({ status: 'failed', message: 'Phone Number already exist login now' });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password.trim(), salt);
      await recruiterModel.create({
        userName,
        companyName,
        phoneNumber,
        email,
        tagLine,
        discription,
        website,
        image,
        password: hashPassword,
      });
      res.json({ status: 'success', message: 'signup success' });
    }
  } catch (error) {
    next(error);
  }
};

const recruiterSignInPost = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const recruiter = await recruiterModel.findOne({ email });
    if (recruiter) {
      if (recruiter.isActive === true) {
        const isMatch = await bcrypt.compare(password, recruiter.password);
        if (recruiter.email === email && isMatch) {
          const recruiterId = recruiter.id;
          const token = jwt.sign({ recruiterId }, process.env.JWT_SECRET_KEY, {
            expiresIn: 60 * 60 * 24,
          });
          res.json({
            auth: true,
            token,
            result: recruiter,
            status: 'success',
            message: 'signin success',
          });
        } else {
          res.json({
            auth: false,
            status: 'failed',
            message: 'User password is incorrect',
          });
        }
      } else {
        res.json({
          auth: false,
          status: 'failed',
          message: 'Profile is Blocked',
        });
      }
    } else {
      res.json({
        auth: false,
        status: 'failed',
        message: 'No user please register',
      });
    }
  } catch (error) {
    next(error);
  }
};

const isRecruiterAuth = async (req, res, next) => {
  try {
    const recruiterDetails = await recruiterModel.findById(req.recruiterId);
    if (recruiterDetails.isActive === true) {
      recruiterDetails.auth = true;
      res.json({
        id: recruiterDetails._id,
        username: recruiterDetails.userName,
        email: recruiterDetails.email,
        auth: true,
        image: recruiterDetails.image || null,
        phoneNumber: recruiterDetails.phoneNumber,
      });
    } else if (recruiterDetails.isActive === false) {
      res.json({ status: 'blocked' });
    } else {
      res.json({ status: 'failed' });
    }
  } catch (error) {
    next(error);
  }
};

const recruiterBlock = async (req, res, next) => {
  try {
    await recruiterModel.updateOne({ _id: req.query.recruiterId }, {
      isActive: false,
    });
    res.json({ status: 'success' });
  } catch (error) {
    next(error);
  }
};

const recruiterActive = async (req, res, next) => {
  try {
    await recruiterModel.updateOne({ _id: req.query.recruiterId }, {
      isActive: true,
    });
    res.json({ status: 'success' });
  } catch (error) {
    next(error);
  }
};

const jobPost = async (req, res, next) => {
  try {
    const {
      jobTitle, companyName, jobCategory, jobQualification, jobDiscription,
      responsibilities, workPlace, salaryRange, jobType, image, location, vaccancy,
    } = req.body;
    const data = await recruiterModel.findById(req.recruiterId);
    const Id = req.recruiterId;
    const jobData = await jobPostModel.create({
      jobTitle,
      jobCategory,
      jobDiscription,
      jobQualification,
      jobType,
      companyName,
      responsibilities,
      workPlace,
      salaryRange,
      image,
      location,
      vaccancy,
      recruiterId: Id,
    });
    res.json({ status: 'success', id: jobData._id });
    await companyModel.findByIdAndUpdate(companyName, {
      $push: {
        job: {
          jobId: jobData._id, name: data.userName,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const data = await recruiterModel.findById(req.recruiterId).populate('companyName');
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const jobsList = async (req, res, next) => {
  try {
    const data = await jobPostModel.find({ recruiterId: req.recruiterId }).populate('jobCategory');
    if (data.length > 0) {
      res.json({ data });
    } else {
      res.json({ status: 'failed' });
    }
  } catch (error) {
    next(error);
  }
};

const getCategoryRec = async (req, res, next) => {
  try {
    const data = await categoryModel.find({});
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const DeleteJob = async (req, res, next) => {
  try {
    await jobPostModel.findByIdAndUpdate(req.query.id, {
      $set: { isActive: false },
    });
    res.json({ status: 'success' });
  } catch (error) {
    next(error);
  }
};

const getDataForEdit = async (req, res, next) => {
  try {
    const data = await jobPostModel.findById(req.query.id).populate('companyName');
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const EditJobPostData = async (req, res, next) => {
  try {
    const {
      jobTitle, companyName, jobCategory, jobQualification, jobDiscription,
      responsibilities, workPlace, salaryRange, jobType, image, location, vaccancy,
    } = req.body;
    await jobPostModel.findByIdAndUpdate(req.query.jobid, {
      $set: {
        jobTitle,
        companyName,
        jobCategory,
        jobQualification,
        jobDiscription,
        responsibilities,
        workPlace,
        salaryRange,
        jobType,
        image,
        location,
        vaccancy,

      },
    });
    res.json({ status: 'success' });
  } catch (error) {
    next(error);
  }
};

const getProfileData = async (req, res, next) => {
  try {
    const data = await recruiterModel.findById(req.recruiterId).populate('companyName');
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const editProfilePost = async (req, res, next) => {
  try {
    const {
      userName, companyName, phoneNumber, email, tagLine, discription, website, image, location,
    } = req.body;
    await recruiterModel.findByIdAndUpdate(req.recruiterId, {
      $set: {
        tagLine, userName, companyName, phoneNumber, email, discription, website, image, location,
      },
    });
    res.json({ status: 'success' });
  } catch (error) {
    next(error);
  }
};

const NumberCheck = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;
    const data = await recruiterModel.findOne({ phoneNumber });
    if (data) {
      res.json({ status: 'success' });
    } else {
      res.json({ status: 'failed', message: 'Phone Number not Exisit' });
    }
  } catch (error) {
    next(error);
  }
};

const setNewPassword = async (req, res, next) => {
  try {
    const { password, confPassword, phoneNumber } = req.body;
    if (password && confPassword && phoneNumber) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password.trim(), salt);
      await recruiterModel.findOneAndUpdate({ phoneNumber }, {
        $set: { password: hashPassword },
      });
      res.json({ status: 'success' });
    } else {
      res.json({ status: 'failed', message: 'Please Retry' });
    }
  } catch (error) {
    next(error);
  }
};

const jobAppliedUsers = async (req, res, next) => {
  try {
    const data = await jobPostModel.findById(req.query.jobId).populate('users.userId');
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const updateJobComment = async (req, res, next) => {
  try {
    if (req.body.userId && req.body.jobId && req.body.comment) {
      await jobPostModel.updateOne({ _id: req.body.jobId, 'users.userId': req.body.userId }, {
        $set: {
          'users.$.comment': req.body.comment,
        },
      });
      await userModel.updateOne({ _id: req.body.userId, 'job.jobId': req.body.jobId }, {
        $set: {
          'job.$.comment': req.body.comment,
        },
      });
      res.json({ status: 'success' });
    } else {
      res.json({ status: 'failed', message: 'comment is not added' });
    }
  } catch (error) {
    next(error);
  }
};

const getSortedList = async (req, res, next) => {
  try {
    const data = await jobPostModel.find({ 'users.comment': 'Good' }).populate('users.userId');
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getAllDatasRecruiterSide = async (req, res, next) => {
  try {
    const data = await userModel.find({});
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getUserForChat = async (req, res, next) => {
  try {
    const data = await userModel.findById(req.params.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getCompanyDetails = async (req, res, next) => {
  try {
    const data = await companyModel.find({});
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getCompanyDataForJob = async (req, res, next) => {
  try {
    const data = await recruiterModel.findById(req.recruiterId).populate('companyName');
    res.json(data);
  } catch (error) {
    next(error);
  }
};
export default {
  recruiterSignUpPost,
  recruiterSignInPost,
  isRecruiterAuth,
  recruiterActive,
  recruiterBlock,
  jobPost,
  getProfile,
  jobsList,
  getCategoryRec,
  DeleteJob,
  getDataForEdit,
  EditJobPostData,
  getProfileData,
  editProfilePost,
  NumberCheck,
  setNewPassword,
  jobAppliedUsers,
  updateJobComment,
  getSortedList,
  getAllDatasRecruiterSide,
  getUserForChat,
  getCompanyDetails,
  getCompanyDataForJob,
};
