import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import YAML from 'yamljs';

import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'

import mongoose from 'mongoose'
import router from './router';
import dotenv from  'dotenv';
dotenv.config();

const swaggerDocument = YAML.load("./swagger.yaml");
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
})

const app = express();

app.use(helmet());
app.use(limiter)
app.use(cors({credentials: true}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());


const server = http.createServer(app)
    server.listen(8080, () => {console.log("server running on http://localhost:8080")
})


mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));


app.use('/', router());
app.get("/", (req, res) => {
    res.send('<h1>you read api</h1><a href="/api-docs">Documentation</a>');
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));