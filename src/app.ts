import express from 'express'
import { helloRouter } from './routes/hello.js'
import dotenv from 'dotenv';
import { urlEncodedParser } from './middlewares/urlEncodedParser.js';
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express';

// env
dotenv.config();
const port = process.env.DB_EXPRESS_PORT

// app
const app = express()

// middlewares
app.use(urlEncodedParser);

// routes
app.use(helloRouter)

// listener
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

// swagger
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
        title: 'Rest API',
        version: '1.0.0',
        },
    },
    apis: ['./src/routes/**/*.ts'],
};
const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
