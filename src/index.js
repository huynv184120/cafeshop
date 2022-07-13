const express = require('express');
const cors = require("cors");
const app = express();
require('dotenv').config();
const {handleAPIError, handleNotFoundError} = require('./middlewares/errorHandler');

const port = process.env.PORT;
const router = require('./routers');
const configCors = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204
};
app.use(cors(configCors));
app.use(express.json());
app.use(express.urlencoded());

app.use('/apis', router);

app.use(handleAPIError);
app.use(handleNotFoundError);

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
})