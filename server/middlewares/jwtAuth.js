import jwt from 'jsonwebtoken';

const jwtSeeker = async (req, res, next) => {
  try {
    const token = req.headers['user-access-token'];
    if (!token) {
      res.send({ status: 'failed', message: 'You need token' });
    } else {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          res.json({ auth: false, status: 'failed', message: 'failed to authenticate' });
        } else {
          req.userId = decoded.userId;
          next();
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

const jwtRecruiter = async (req, res, next) => {
  try {
    const token = req.headers['recruiter-access-token'];
    if (!token) {
      res.send({ status: 'failed', message: 'You need token' });
    } else {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          res.json({ auth: false, status: 'failed', message: 'failed to authenticate' });
        } else {
          req.recruiterId = decoded.recruiterId;
          next();
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

const jwtAdmin = async (req, res, next) => {
  try {
    const token = req.headers['admin-access-token'];
    if (!token) {
      res.send({ status: 'failed', message: 'You need token' });
    } else {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          res.json({ auth: false, status: 'failed', message: 'failed to authenticate' });
        } else {
          req.adminId = decoded.adminId;
          next();
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

export default { jwtSeeker, jwtRecruiter, jwtAdmin };
