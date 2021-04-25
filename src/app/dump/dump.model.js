import mongoose from "mongoose";

const DumpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  key: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sellPrice: {
    type: Number,
    required: true,
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
  logs: {
    type: Array,
    default: [],
  },
});

DumpSchema.method({});

DumpSchema.statics = {
  list({ skip = 0, limit = 50, filter = {}, limited = true } = {}) {
    if (limited) {
      return this.find(filter)
        .sort({ key: -1 })
        .skip(+skip)
        .limit(+limit)
        .lean();
    }

    return this.find(filter).sort({ createdAt: -1 }).lean();
  },

  create(dump, by) {
    const dumpObject = Object.assign(dump, {
      logs: [
        {
          role: by.role,
          by: by.username,
          type: "CREATE",
          date: new Date(),
        },
      ],
    });
    const dumps = new this(dumpObject);
    return dumps.save();
  },

  disable(filter, { disabled }, by) {
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
    );
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
    );
  },
  total(filter) {
    return this.count(filter);
  },
  getOne(filter) {
    return this.findOne(filter).lean();
  },
};

export default mongoose.model("Dump", DumpSchema);
