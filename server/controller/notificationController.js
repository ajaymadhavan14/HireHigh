import notificationModel from '../model/notificationSchema.js';

const AddNotification = async (req, res, next) => {
  try {
    const {
      senderId, recieverId, jobId, content,
    } = req.body;
    await notificationModel.create({
      senderId, recieverId, jobId, content,
    });
    res.json({ status: 'success' });
  } catch (error) {
    next(error);
  }
};

const GetNotification = async (req, res, next) => {
  try {
    if (req.userId) {
      const data = await notificationModel.find({ recieverId: req.userId })
        .sort({ createdAt: -1 }).populate('jobId');
      if (data) {
        res.json(data);
      } else {
        res.json({ status: 'failed' });
      }
    } else if (req.companyId) {
      const data = await notificationModel.find({ recieverId: req.companyId })
        .sort({ createdAt: -1 }).populate('jobId');
      if (data) {
        res.json(data);
      } else {
        res.json({ status: 'failed' });
      }
    } else {
      const data = await notificationModel.find({ recieverId: req.recruiterId })
        .sort({ createdAt: -1 }).populate('jobId');
      if (data) {
        res.json(data);
      } else {
        res.json({ status: 'failed' });
      }
    }
  } catch (error) {
    next(error);
  }
};

export default { AddNotification, GetNotification };
