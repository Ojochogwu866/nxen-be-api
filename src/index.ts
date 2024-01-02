// Import necessary modules and packages
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
import dotenv from 'dotenv';
dotenv.config();

// Load Swagger documentation from YAML file
const swaggerDocument = YAML.load("./swagger.yaml");

// Set up rate limiting for API requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  limit: 100,  // Limit each IP to 100 requests per windowMs
  standardHeaders: 'draft-7',
  legacyHeaders: false,
})

// Create an Express application
const app = express();

// Use security-related middleware
app.use(helmet());
app.use(limiter)
app.use(cors({ credentials: true }));
app.use(compression());

// Parse incoming JSON requests
app.use(bodyParser.json());
app.use(cookieParser());

// Create an HTTP server using Express
const server = http.createServer(app)

// Start the server and listen on port 8080
server.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
})

// Set up MongoDB connection
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

// Set up routing for API version 1 using the router
app.use('/api/v1', router());

// Define a route for the root path
app.get("/api/v1", (req, res) => {
  res.send('<h1>You read API</h1><a href="/api-docs">Documentation</a>');
});

// Set up Swagger documentation route
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
