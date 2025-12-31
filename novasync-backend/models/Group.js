import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  members: {
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        return v && v.length >= 4;
      },
      message: 'A group must have at least 4 members.'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Group', GroupSchema);