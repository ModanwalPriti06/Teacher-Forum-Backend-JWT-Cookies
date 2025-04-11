const jwt = require('jsonwebtoken');


function checkAuth(req, res, next) {
    const authToken = req.cookies.authToken;
    const refreshToken = req.cookies.refreshToken;

    if(!authToken || !refreshToken){
        return res.status(400).json({message: 'unauthorized'});
    }

    jwt.verify(authToken, process.env.JWT_SECRET_KEY, (err, decoded) => {   // if auth token is expire then check refresh token validity
        if (err) {
            jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY, (refreshErr, refreshDecoded) => {  // if auth token is expire then check refresh token validity
                if (refreshErr) {
                    return res.status(401).json({ message: 'Unauthorized' });
                }
                else {  //auth token expire but refresh token is valid
                    const newAuthToken = jwt.sign({ userId: refreshDecoded.userId }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
                    const newRefreshToken = jwt.sign({ userId: refreshDecoded.userId }, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '10d' })
                    res.cookie('authToken', newAuthToken, {
                        sameSite: 'none',
                        httpOnly: true,
                        secure: true
                    });

                    res.cookie('refreshToken', newRefreshToken, {
                        sameSite: 'none',
                        httpOnly: true,
                        secure: true
                    });

                    req.userId = refreshDecoded.userId;
                    req.ok = true;
                    req.message = "Authentication successful";
                    next();
                }
            })
        }
        else{  // if token is not expire
            req.userId = decoded.userId; // checking backend storage userId and frontend userId
            req.ok = true;
            req.message = "Authentication successful";
            next();
        }
    })
}

module.exports = checkAuth