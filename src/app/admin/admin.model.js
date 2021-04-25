/* eslint-disable func-names */
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { pathOr } from "ramda";

const AdminSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true,
  },
  failureAttemptCount: {
    type: Number,
    default: 0,
  },
  permissions: [String],
  logs: {
    type: Array,
    default: [],
  },
  regions: {
    type: [Number],
    required: true,
    validate: {
      validator: function (array) {
        return array.length > 0;
      },
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

AdminSchema.pre("save", async function (next) {
  const admin = this;
  if (admin.isModified("password")) {
    admin.password = await bcrypt.hash(admin.password, 8);
  }
  return next();
});

AdminSchema.pre("updateOne", async function (next) {
  const password = pathOr(null, ["$set", "password"], this.getUpdate());
  if (!password) {
    return next();
  }

  this.getUpdate().$set.password = await bcrypt.hash(password, 8);
  return next();
});

AdminSchema.method({});

AdminSchema.statics = {
  list({
    skip = 0,
    limit = 50,
    filter = {},
    limited = true,
    sort = { createdAt: -1 },
  } = {}) {
    if (limited) {
      return this.find(filter)
        .sort(sort)
        .skip(+skip)
        .limit(+limit)
        .lean();
    }
    return this.find(filter).sort(sort).lean();
  },

  create(admin, by) {
    const adminObject = Object.assign(admin, {
      logs: [
        {
          role: by.role,
          by: by.username,
          type: "CREATE",
          date: new Date(),
        },
      ],
    });
    const createdAdmin = new this(adminObject);
    return createdAdmin.save();
  },

  getOne(filter) {
    return this.findOne(filter).lean();
  },

  increaseFailureAttempt(filter) {
    return this.updateOne(filter, { $inc: { failureAttemptCount: 1 } });
  },

  resetFailureAttempt(filter) {
    return this.updateOne(filter, { $set: { failureAttemptCount: 0 } });
  },

  update(filter, newInfo, by) {
    return this.findOneAndUpdate(
      filter,
      {
        $set: newInfo,
        $push: {
          logs: {
            role: by.role,
            by: by.username,
            type: "UPDATE",
            date: new Date(),
          },
        },
      },
      { new: true }
    );
  },
  total(filter = {}) {
    return this.count(filter);
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
};

export default mongoose.model("Admin", AdminSchema);
