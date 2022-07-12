const express = require('express');
const cors = require("cors");
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const route = require('./routers');
const configCors = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials:true,
    optionsSuccessStatus: 204
};
app.use(cors(configCors));
app.use(express.json());
app.use(express.urlencoded());

route(app);

app.listen(port, ()=>{
    console.log(`server listening on port ${port}`);
})