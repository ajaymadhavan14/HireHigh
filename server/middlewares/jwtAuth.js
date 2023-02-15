import jwt from 'jsonwebtoken';

const jwtSeeker = async (req, res, next) => {
  const token = req.headers['u-access-token'];
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
};

const jwtRecruiter = async (req, res, next) => {
  console.log(req.headers);
  const token = req.headers['r-access-token'];
  console.log(token);
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
};

const jwtAdmin = async (req, res, next) => {
  const token = req.headers['a-access-token'];
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
};

export default { jwtSeeker, jwtRecruiter, jwtAdmin };
