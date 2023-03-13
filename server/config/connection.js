import mongoose from 'mongoose';

const connectDb = async (DATABASE_URL) => {
  mongoose.set('strictQuery', false);
  try {
    await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => {
      console.log('connected successfully..');
    }).catch((err) => {
      console.error(err);
    });
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
