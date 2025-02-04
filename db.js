const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URL = process.env.MONGO_URL
const DB_NAME  = process.env.DB_NAME


console.log('MONGO_URL',MONGO_URL,DB_NAME )
mongoose.connect(MONGO_URL, {
    dbName: DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Connected to DB...');
})
.catch((err) => {  
    console.error('Error:', err);
});



