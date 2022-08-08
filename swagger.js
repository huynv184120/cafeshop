const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
    info: {
        title: 'CAFESHOP API',
        description: 'CAFE SHOP API',
    },
    schemes: ['http'],
    host: `localhost:3000`,
};

const outputFile = 'swagger.json';
const endpointsFiles = ['src/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */
swaggerAutogen(outputFile, endpointsFiles, doc);