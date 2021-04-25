import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  brokerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Broker",
    required: true,
  },
  conexId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conex",
    required: true,
  },
  dumps: {
    type: Array,
    default: [],
  },
  sellPrice: {
    type: Number,
    default: 0,
  },
  buyPrice: {
    type: Number,
    default: 0,
  },
  paid: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  logs: {
    type: Array,
    default: [],
  },
  referral: {
    type: String,
  },
  region: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

RequestSchema.statics = {
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

  create(request, by) {
    const requestObject = Object.assign(request, {
      logs: [
        {
          role: by.role,
          by: by.username,
          type: "CREATE",
          date: new Date(),
        },
      ],
    });
    const newRequest = new this(requestObject);
    return newRequest.save();
  },

  total(filter) {
    return this.count(filter);
  },

  getOne(filter) {
    return this.findOne(filter).lean();
  },

  async getIds(filter) {
    const requests = await this.find(filter);
    return requests.map((item) => item._id);
  },
};

export default mongoose.model("Request", RequestSchema);
