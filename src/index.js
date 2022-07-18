const express = require('express');
const cors = require("cors");
const app = express();
require('dotenv').config();
const {handleAPIError, handleNotFoundError} = require('./middlewares/errorHandler');
const mongodb = require('./utils/mongodb');
mongodb.connect(process.env.MONGODB_URL,{});

const port = process.env.PORT;
const router = require('./routers');
const configCors = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204
};

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const swaggerOption = {
    swaggerOptions: {
        preauthorizeApiKey: true
    }
}
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOption))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors(configCors));
app.use(express.json());
app.use(express.urlencoded());

app.use('/apis', router);

app.use(handleAPIError);
app.use(handleNotFoundError);

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
})

// PORT=3000
// DB_HOST=localhost
// DB_USER=root
// DB_PWD=24032000
// DB_NAME=cafeshop
// MONGODB_URL=mongodb://localhost:27017
// MONGODB_NAME=cafeshop
// SECRETKEY_JWT_TOKEN=AJNADNJQ143DWE2