import mongoose from 'mongoose';

const CharacterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sex: { type: String },
  hashtags: { type: String }, // Store raw string like "#funny #sarcastic"
  nsfw: { type: String, enum: ['SFW', 'NSFW'], default: 'SFW' },
  description: { type: String },
  starter: { type: String },
  image: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

export default mongoose.model('Character', CharacterSchema);
