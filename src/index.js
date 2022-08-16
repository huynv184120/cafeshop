const express = require('express');
const cors = require("cors");
const app = express();
require('dotenv').config();
const {handleAPIError, handleNotFoundError} = require('./middlewares/errorHandler');
const {connect} = require('./utils/mongodb');
connect(process.env.MONGODB_URL,{});
const storage = require('./utils/storage');
storage.listShopUserOnline = [];
const port = process.env.PORT;
const router = require('./routers');
const {redisClient} = require('./utils/redis');
const logMidle = require('./middlewares/logMidlewares');
const socketHandler = require('./socket/handle_events');
const configCors = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204
};


const configCorsSocket = {
    cors: {
      origin: "*",
      credentials:true,
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'Cookies']    
    }
}

const server = require("http").Server(app);
const io = require("socket.io")(server,configCorsSocket);


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
app.use(logMidle);


app.use('/apis', router);

app.use(handleAPIError);
app.use(handleNotFoundError);

io.on("connect", (socket) => {
    console.log("co thang ket noi roi")
    socketHandler.online(io, socket);
    socketHandler.offline(io, socket);
})

server.listen(port, () => {
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