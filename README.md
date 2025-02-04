# Teacher-Forum

In this project there is two role teacher and student:
## Teacher: 
- can create classroom
- can upload notes
- can apply crud operation on notes
- can give classroom access to request student via otp

## Student:
- Can read notes only
- can search classroom
- can take access classroom - (send Otp Teacher -> check otp -> join class function)
- Access classroom have containes list of joined classroom like - classroom1, classroom2 etc.


## Functionality:

- Sign up page
- login page
- search bar
- send otp on email and get otp number
  - goto email
  - manage your account
  - search app password
  - add name and create password
- mongoDb
  - mongodb atlas search and open
  - goto database - new project create - click create project
  - overview cluster and make free (cluser: mongodb server, atlas -  cloud-based database service, compass- graphical user interface (GUI) tool provided by MongoDB)
  - create deployment
  - username and password
  - choose a connection method
  - goto compass
  - add have install or not choose and done

# Frontend connect backend
- make backend folder
- npm init
- npm i bcrypt body-parser cookie-parser dotenv express jsonwebtoken mongoose nodemailer
  - nodemailer - use for send otp and mail
- make folder - index.js, middleware, .env , models, routes and utiles 
- work on index.js and import express and all
 ```
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

// app.use('/auth' , authRoutes);
// app.use('/class', classroomRoutes);

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
  ```

### Use password should be store in hash format then
- Model file
```
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});
```
## Important thing
- Using bcrypt decode the password
- jwt for authenticatiom
- nodemailer for sned mail and otp
- auth token from req.cookies
- refresh token
- npm i toastify, npm install react-toastify. (very nice thing for ui alert/popup like erp props.setSnackInfo)

## Facing issue
- Sending otp : resolve to add Ip Address with the help of stack overflow and chatgpt.
- Login and not navigating home page: Not updating auth data in AuthContext





 

 

