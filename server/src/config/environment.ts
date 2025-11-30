import dotenv from "dotenv";
import type { Environment } from "./environment.types.js";
import environmentSchema from "./environment.schema.js";
import * as z from "zod";

dotenv.config();

let typedEnvironment = {};

const env = process.env;

const { data, error } = z.safeParse(environmentSchema, env);

if (error) throw new Error(error.message);
typedEnvironment = data;

export default typedEnvironment as Environment;
