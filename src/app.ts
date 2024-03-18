import express from 'express'
import { helloRouter } from './routes/hello.js'
import dotenv from 'dotenv';
import { urlEncodedParser } from './middlewares/urlEncodedParser.js';

// env
dotenv.config();
const port = process.env.DB_HELLO_PORT

const app = express()
app.use(urlEncodedParser);

// routes
app.use(helloRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
