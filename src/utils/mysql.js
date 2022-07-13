const { query } = require('express');
const syncSql = require('sync-sql');

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
}

const mysqlQuery = async (query, params) => {
    return syncSql.mysql(config, query, params);
}

module.exports = mysqlQuery;