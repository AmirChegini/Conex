/* eslint-disable func-names */
import mongoose from "mongoose";

const ConexSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  estimatedAddress: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  region: {
    type: Number,
    default: 0,
  },
  inTrafficRegion: {
    type: Boolean,
    default: false,
  },
  inOddEvenRegion: {
    type: Boolean,
    default: false,
  },
  brokerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Broker",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  logs: {
    type: Array,
    default: [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

ConexSchema.statics = {
  list({ skip = 0, limit = 50, filter = {}, limited = true } = {}) {
    if (limited) {
      return this.find(filter)
        .sort({ createdAt: -1 })
        .skip(+skip)
        .limit(+limit)
        .lean();
    }

    return this.find(filter).sort({ createdAt: -1 }).lean();
  },
  getOne(filter) {
    return this.findOne(filter).lean();
  },

  create(conex, by) {
    const conexObject = Object.assign(conex, {
      logs: [
        {
          role: by.role,
          by: by.username,
          type: "CREATE",
          date: new Date(),
        },
      ],
    });
    const createdConex = new this(conexObject);
    return createdConex.save();
  },
  async update(filter, newInfo, by) {
    return this.findOneAndUpdate(
      filter,
      {
        $set: newInfo,
        $push: {
          logs: {
            role: by.role,
            username: by.username,
            type: "UPDATE",
            time: new Date(),
          },
        },
      },
      { new: true }
    ).lean();
  },
  async total(filter) {
    return this.count(filter);
  },

  async getIds(filter) {
    const users = await this.find(filter);
    return users.map((item) => item._id);
  },
  assign(filter, brokerId, by) {
    return this.findOneAndUpdate(
      filter,
      {
        $set: { brokerId },
        $push: {
          logs: {
            role: by.role,
            by: by.username,
            type: "ASSIGN_BROKER",
            date: new Date(),
          },
        },
      },
      { new: true }
    ).lean();
  },
};

export default mongoose.model("Conex", ConexSchema);
