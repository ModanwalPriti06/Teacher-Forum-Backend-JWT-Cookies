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
# JWT (Authorization only not authentication)
- JWT (JSON Web Token) is a secure and compact way to transmit information between parties as a JSON object. It is commonly used for authentication and authorization in web applications.
- JWT is stateless, meaning the server doesn’t store sessions, making it scalable and efficient!
- JWT Playground: https://jwt.io/

<img width="1680" alt="Screenshot 2025-04-01 at 10 52 17 PM" src="https://github.com/user-attachments/assets/1a92ae99-aa3c-4e0a-b642-6da3cde72de0" />
<img width="1680" alt="Screenshot 2025-04-01 at 10 40 50 PM" src="https://github.com/user-attachments/assets/c25ac121-e27d-4351-821e-56ca4ea43351" />
<img width="1680" alt="Screenshot 2025-04-01 at 10 40 45 PM" src="https://github.com/user-attachments/assets/56e64c0b-7de1-46a1-ae64-aa5fd9c59f4d" />

## How JWT Works?
- User Logs In – The user provides credentials (e.g., email & password). sessionId store in server memory.
- Server Generates JWT – If credentials are valid, the server creates a JWT and sends it to the client.
- Client Stores Token – The client stores the JWT (usually in localStorage or HTTP-only cookies).
- Client Sends JWT with Requests – For protected routes, the client includes the JWT in the request headers.
- Server Verifies JWT – The server checks the token’s validity. If valid, it grants access; otherwise, it rejects the request.

## JWT Structure 
```
Header.Payload.Signature
```
- Header : Contains metadata like the algorithm used (HS256).
- Payload : Contains user data (e.g., user ID, expiration time).
- Signature : A hashed value to verify the token’s integrity.
<img width="1680" alt="Screenshot 2025-04-01 at 10 56 29 PM" src="https://github.com/user-attachments/assets/f7a17956-f089-4d33-a213-c4b2351fe9ff" />
#### NOTE - Token creter three part header.payload.signature and here signature is secrete key which is admin only know and can't get anyone. If some person change hearder and payload but they can't change anything in signature. We are verify signature if match then authorized user. 

## JWT Hazards 
- XSS - cross-site scripting
- CSRF - CS Request Forgrey
  
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
- The jwt.sign() function is used to create a new JSON Web Token (JWT) by encoding a payload (user data) and signing it with a secret key.

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
- The jwt.verify() function is used to decode and validate a JWT (JSON Web Token). It ensures that the token is valid and has not been tampered with. If the token is valid, it returns the decoded payload; otherwise, it throws an error.

```
jwt.verify(token, secretKey, [options], [callback])
```
```
const token = jwt.sign({ userId: "12345" }, secretKey, { expiresIn: "1h" });
setTimeout(() => {
    try {
        const decoded = jwt.verify(token, secretKey);
        console.log("Token is still valid:", decoded);
    } catch (error) {
        console.log("Token has expired:", error.message);
    }
}, 3600000); // 1 hour later
```
- In a Node.js + Express.js app, jwt.verify() is commonly used in middleware to protect routes.

```
const authenticate = (req, res, next) => {
    const token = req.cookies.authToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded; // Attach user info to request
        next(); // Proceed to the next middleware
    } catch (error) {
        return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
};

app.get("/protected", authenticate, (req, res) => {
    res.json({ message: "Welcome to the protected route!", user: req.user });
});

```
- **https://www.youtube.com/watch?v=mGrVmEex6_g&list=PLinedj3B30sDby4Al-i13hQJGQoRQDfPo&index=24**
- 
## Where is JWT Used?
- JWT is stateless authentication
- User Authentication (Login systems)
- Authorization (Restrict access to certain pages)
- API Security (Protect routes)
- Microservices Communication

## JWT Token
- In a JWT-based authentication system, two tokens are commonly used:

#### 1️⃣ Access Token
- Short-lived (e.g., 15 minutes to a few hours).
- Used to authenticate API requests.
- Stored in memory or HTTP-only cookies (safer than local storage).
- Expires quickly for security reasons.
- Sent as JSON client stores in memory, Do not store in local storage or cookie. 
#### 2️⃣ Refresh Token
- Long-lived (e.g., days to weeks).
- Used to request a new access token when it expires.
- Stored securely (preferably HTTP-only cookies).
- Cannot access protected routes directly, only used for refreshing access tokens.
- Sent as httpOnly cookie Not accessible via javascript , Must have expiry at some point.

#### How They Work Together?
- User logs in → Receives access & refresh tokens.
- Access token is used for API requests.
- When the access token expires → The refresh token is sent to get a new access token.
- If the refresh token expires → User must log in again.

## Why JWT is NOT Needed in Login?
- The login API is where the user proves their identity by providing email and password.
- At this stage, the user doesn't have a token yet.
- The login process generates JWT after successful authentication.
- JWT is only needed for subsequent requests after login.

---
# Implementation
- npm i jsonwebtoken
- where we are login that api - jwt.sign(payload, signature) it will return res
- check other - jwt.verify(token, signature)

### Sending Token to user there is 2 way:
- cookies:
   - cookies always create by server. create cookies - res.cookie(token, sign , {domain:  ---}). cookie only for browser application.
   - so whenever we req either get, post, put then browser send automatically token from cookie is token is valid or not means user login or not.
   - Cookies domain specific hota hai. means jo server jis domain k lie cookie banata hai vo usi k pass jati hai.
- response through
    - server create token and send token then user safe that token.
    - Question is there how u will get that token. So will say whenever you req then in header and key vlaue pair keep that token vlaue.
        - header : { authorization: 'Bearer <cookie token>' }  // standard way

# Authentication and Authorization
- Authentication: Proving who you are, Identity verification, First (login step), Based on Credentials (username, password, token)		
- Authorization: Defining what you're allowed to do, Permission control, After authentication, Based on Roles, policies, access rights



	

      








 

 

