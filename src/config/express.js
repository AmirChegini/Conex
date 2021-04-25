import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import methodOverride from "method-override";
import cors from "cors";
import httpStatus from "http-status";
import expressValidation from "express-validation";
import helmet from "helmet";
import { pathOr } from "ramda";

import routes from "../index.route";
import config from "./config";
import ExtendedError from "../utils/extendedError";

const app = express();

if (config.env === "development") {
  app.use(logger("dev"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(methodOverride());
app.use(helmet());
app.use(cors());

app.use("/static", express.static("static"));
app.use("/api", routes);

app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    const message = pathOr("", ["errors", "0", "messages", "0"], err);

    return next(new ExtendedError(message, err.status, true));
  } else if (err.name !== "ExtendedError") {
    return next(new ExtendedError(err.message, err.status, false));
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use("/api", (req, res, next) =>
  next(new ExtendedError("API not found", httpStatus.NOT_FOUND))
);
app.use((err, req, res, next) => {
  res.status(err.status).json({
    success: false,
    message: err.isPublic ? err.message : httpStatus[err.status],
  });
});

export default app;
