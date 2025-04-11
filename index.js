const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const classroomRoutes = require('./routes/classroomRoutes');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT;
require('./db');

const allowOrigin = [process.env.FRONTEND_URL];

app.use(
    cors({
        origin: function(origin, callback) {
            if(!origin || allowOrigin.includes(origin)) {
                callback(null, true);
            }else{
                callback(new Error('Not allow by cors'));
            }
        },
        credentials: true
    })
)

app.use(bodyParser.json());
app.use(cookieParser({
    httpOnly : true,
    secure : true,
    sameSite : 'none',
    maxAge : 1000* 60 * 60 * 24 * 7,
    signed: true
}));


app.use('/auth' , authRoutes);
app.use('/class', classroomRoutes);

app.use(express.urlencoded({extended: false})); //add for file and image 

app.get('/', (req, res)=>{
    console.log('hello');
    return res.status(200).send('Hello')
})


app.get('/getUserData', (req, res)=>{
    console.log('hello');
    return res.status(200).send('Hii')
})


app.listen(port, ()=>{
    console.log(`App teacher forum listening on the port: ${port}`);
})

