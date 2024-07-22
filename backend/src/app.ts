import { createLogger, requestLogger } from "@lib/logger";
import express, { Application, NextFunction, Request, Response, Router } from "express"
import helmet from "helmet";
import compress from 'compression';
import cors from "cors";
import cookieParser from "cookie-parser";

import { wrapAsyncControllers } from "./middleware/try.handler";
import routes from "./router/api";
import configureGlobalErrorHandler from "./middleware/error.handler";

const app: Application = express();
const router: Router = Router();
const logger = createLogger();


app.use(requestLogger(logger));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(compress());

wrapAsyncControllers(router)


router.use(cors());
router.use("/", routes)

router.use(configureGlobalErrorHandler(logger));
app.use(router)

export default app;