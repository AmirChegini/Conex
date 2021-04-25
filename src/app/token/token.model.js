import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

TokenSchema.statics = {
  create(userId, token) {
    return new this({ userId, token }).save();
  },
  getOne(filter) {
    return this.findOne(filter);
  },
  remove(filter) {
    return this.deleteOne(filter);
  },
  removeMany(filter) {
    return this.deleteMany(filter);
  },
};

export default mongoose.model("Token", TokenSchema);
