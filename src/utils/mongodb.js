const mongoose = require('mongoose')

const connect = async () => {

    try{
        await mongoose.connect(process.env.MONGODB_URL,
        {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        }
        );
        console.log("Connect MongoDB successfully");
    }catch{
        console.log("DB connect failed");
    }
};

module.exports = {connect};