import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String },
  profilePicture: { type: String, default: '' },
  sex: { type: String, default: 'N/A' }
});

export default mongoose.model('User', userSchema);
