/* eslint-disable func-names */
import mongoose, { mongo } from "mongoose";
import bcrypt from "bcryptjs";
import { pathOr } from "ramda";

const BrokerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  nationalCode: {
    type: String,
  },
  region: {
    type: Number,
    required: true,
  },
  conexId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conex",
  },
  password: {
    type: String,
    required: true,
  },
  referral: {
    type: String,
    required: true,
  },
  requests: {
    type: Array,
    default: [],
  },
  logs: {
    type: Array,
    default: [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  failureAttemptCount: {
    type: Number,
    default: 0,
  },
});

BrokerSchema.pre("save", async function (next) {
  const broker = this;
  if (broker.isModified("password")) {
    broker.password = await bcrypt.hash(broker.password, 8);
  }
  return next();
});

BrokerSchema.pre("updateOne", async function (next) {
  const password = pathOr(null, ["$set", "password"], this.getUpdate());
  if (!password) {
    return next();
  }

  this.getUpdate().$set.password = await bcrypt.hash(password, 8);
  return next();
});

BrokerSchema.statics = {
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

  create(broker, by) {
    const brokerObject = Object.assign(broker, {
      logs: [
        {
          role: by.role,
          by: by.username,
          type: "CREATE",
          date: new Date(),
        },
      ],
    });
    const newBroker = new this(brokerObject);
    return newBroker.save();
  },

  disable(filter, disabled, by) {
    return this.findOneAndUpdate(
      filter,
      {
        $set: { disabled },
        $push: {
          logs: {
            role: by.role,
            by: by.username,
            type: "DISABLE",
            date: new Date(),
          },
        },
      },
      { new: true }
    ).lean();
  },

  remove(filter, by) {
    return this.findOneAndUpdate(
      filter,
      {
        $set: { deleted: true },
        $push: {
          logs: {
            role: by.role,
            by: by.username,
            type: "DELETE",
            date: new Date(),
          },
        },
      },
      { new: true }
    ).lean();
  },

  async getIds(filter) {
    const times = await this.find(filter);
    return times.map((item) => item._id);
  },

  async total(filter) {
    return this.count(filter);
  },

  getOne(filter) {
    return this.findOne(filter).lean();
  },

  updatePassword(filter, password, by) {
    return this.updateOne(filter, {
      $set: {
        password,
      },
      $push: {
        logs: {
          role: by.role,
          by: by.username,
          type: "UPDATE_PASSWORD",
          date: new Date(),
        },
      },
    });
  },
  increaseFailureAttempt(filter) {
    return this.updateOne(filter, { $inc: { failureAttemptCount: 1 } });
  },

  resetFailureAttempt(filter) {
    return this.updateOne(filter, { $set: { failureAttemptCount: 0 } });
  },
  assign(filter, conexId, by) {
    return this.findOneAndUpdate(
      filter,
      {
        $set: { conexId },
        $push: {
          logs: {
            role: by.role,
            by: by.username,
            type: "ASSIGN_CONEX",
            date: new Date(),
          },
        },
      },
      { new: true }
    ).lean();
  },
};

export default mongoose.model("Broker", BrokerSchema);
