import Joi from "joi";
import dotenv from "dotenv";

dotenv.config();

const envVariablesSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(["development", "production", "test", "provision"])
    .default("development"),
  PORT: Joi.number().default(4041),
  MONGOOSE_DEBUG: Joi.boolean().when("NODE_ENV", {
    is: Joi.string().equal("development"),
    then: Joi.boolean().default(true),
    otherwise: Joi.boolean().default(false),
  }),
  JWT_SECRET: Joi.string()
    .required()
    .description("JWT Secret in no entered in .env"),
  MONGO_HOST: Joi.string().default("localhost"),
  MONGO_PORT: Joi.number().default(27017),
  KAVEH_NEGAR_TOKEN: Joi.string()
    .required()
    .description("KavehNegar Token in no entered in .env"),
  NESHAN_TOKEN: Joi.string()
    .required()
    .description("Neshan Token no entered in .env"),
})
  .unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVariablesSchema);
if (error) {
  throw new Error(`Initializing Failed due to: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwtSecret: envVars.JWT_SECRET,
  mongoUrl: envVars.MONGO_URL,
  kavehToken: envVars.KAVEH_NEGAR_TOKEN,
  neshanToken: envVars.NESHAN_TOKEN,
  redis: {
    port: envVars.REDIS_PORT,
    auth: envVars.REDIS_AUTH,
  },
};

export default config;
