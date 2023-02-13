import { Schema, model } from 'mongoose';

const adminschema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
    // lowercase: true,
    // trim:true,
  },
  password: {
    type: String,
    required: true,
    // trim:true,
    // minlength: [6],
  },
}, { timestamps: true });

export default model('admin', adminschema);
