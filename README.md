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
- Login and not navigating home page: Not updating auth data in AuthContext.
---
# JWT
- JWT (JSON Web Token) is a secure and compact way to transmit information between parties as a JSON object. It is commonly used for authentication and authorization in web applications.

## How JWT Works?
- User Logs In – The user provides credentials (e.g., email & password).
- Server Generates JWT – If credentials are valid, the server creates a JWT and sends it to the client.
- Client Stores Token – The client stores the JWT (usually in localStorage or HTTP-only cookies).
- Client Sends JWT with Requests – For protected routes, the client includes the JWT in the request headers.
- Server Verifies JWT – The server checks the token’s validity. If valid, it grants access; otherwise, it rejects the request.

## JWT Structure 🏗️
```
Header.Payload.Signature
```
- Header – Contains metadata like the algorithm used (HS256).
- Payload – Contains user data (e.g., user ID, expiration time).
- Signature – A hashed value to verify the token’s integrity.

## JWT Authentication Example in Node.js (Express)
- Generating JWT
```
const jwt = require('jsonwebtoken');
const user = { id: 1, username: "priti" };

const secretKey = "yourSecretKey"; 
// Generate Token
const token = jwt.sign(user, secretKey, { expiresIn: "1h" });
console.log("JWT:", token);
```

- Verifying JWT (Middleware)
```
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(403).send("Access Denied");
  try {
    const verified = jwt.verify(token, secretKey);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};
```



## JWT Token
In a JWT-based authentication system, two tokens are commonly used:

#### 1️⃣ Access Token
- Short-lived (e.g., 15 minutes to a few hours).
- Used to authenticate API requests.
- Stored in memory or HTTP-only cookies (safer than local storage).
- Expires quickly for security reasons.
#### 2️⃣ Refresh Token
- Long-lived (e.g., days to weeks).
- Used to request a new access token when it expires.
- Stored securely (preferably HTTP-only cookies).
- Cannot access protected routes directly, only used for refreshing access tokens.

#### How They Work Together?
- User logs in → Receives access & refresh tokens.
- Access token is used for API requests.
- When the access token expires → The refresh token is sent to get a new access token.
- If the refresh token expires → User must log in again.





 

 

