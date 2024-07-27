import { initializeControllers, registerControllers } from "@lib/ControllerRegistry";
import express, { Router } from "express";

import helmet from "helmet";
import compress from 'compression';
import cors from "cors";
import cookieParser from "cookie-parser";
import { wrapAsyncControllers } from "@lib/AsyncController";
import path from "path";
import { FileController } from "./files/FileContoller";
import bodyParser from "body-parser";


const app = express()
const router = Router();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(compress());
app.use(cors());

app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
});


wrapAsyncControllers(router)
registerControllers([
    FileController
]);
initializeControllers(router)

app.use(router);

export default app;
