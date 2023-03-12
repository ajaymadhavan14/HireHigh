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
    console.log(req.userId);
    console.log('11111111111111111');
    // const data = await notificationModel.find({}).sort({ createdAt: -1 });
    // console.log(data);
    if (req.userId) {
      console.log('222222222222222222');
      const data = await notificationModel.find({ recieverId: req.userId })
        .sort({ createdAt: -1 }).populate('jobId');
      if (data) {
        res.json(data);
      } else {
        res.json({ status: 'failed' });
      }
    } else {
      console.log('3333333333333');
      const data = await notificationModel.find({ recieverId: req.recruiterId })
        .sort({ createdAt: -1 });
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
