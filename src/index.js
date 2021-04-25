import mongoose from "mongoose";
import cors from "cors";
import config from "./config/config";
import app from "./config/express";

const MONGO_URI = config.mongoUrl;

app.use(cors({ origin: true, credentials: true }));
mongoose.connect(MONGO_URI, { keepAlive: 1, useNewUrlParser: true });
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${MONGO_URI}`);
});

if (!module.parent) {
  app.listen(config.port, () => {
    console.log(`Server Started On ${config.port}, (${config.env})`);
  });
}

export default app;
