const mysql = require('mysql');
const dbConnection = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME
    }
);

dbConnection.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('database is connected');
});


module.exports = dbConnection;