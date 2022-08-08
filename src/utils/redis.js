const redis = require('redis');

const redisClient = redis.createClient(6379);

redisClient.on('error', (err) => {
    console.log(err);
})
redisClient.connect().then(()=>{
    console.log('connect redis successful');
}
)
module.exports = {redisClient};