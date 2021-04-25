/* eslint-disable func-names */
import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["MALE", "FEMALE", "OTHERS"],
  },
  requests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
    },
  ],
  referral: {
    type: String,
    required: true,
  },
  region: {
    type: Number,
    required: true,
  },
  credit: {
    type: Number,
    default: 0,
  },
  logs: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

CustomerSchema.statics = {
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
  create(customer, by) {
    const customerObj = Object.assign(customer, {
      logs: [
        {
          role: by.role,
          by: by.username,
          type: "CREATE",
          date: new Date(),
        },
      ],
    });
    const newCustomer = new this(customerObj);
    return newCustomer.save();
  },
  async addRequest(filter, requestId, by) {
    return this.findOneAndUpdate(
      filter,
      {
        $push: {
          requests: requestId,
          logs: {
            role: by.role,
            by: by.username,
            type: "CREATE_REQUEST",
            date: new Date(),
          },
        },
      },
      { new: true }
    );
  },
  async updateCredit(filter, credit) {
    return this.findOneAndUpdate(filter, { $inc: { credit } }, { new: true });
  },
  async total(filter) {
    return this.count(filter);
  },

  async getIds(filter) {
    const users = await this.find(filter);
    return users.map((item) => item._id);
  },
};

export default mongoose.model("Customer", CustomerSchema);
