const jwt = require("jsonwebtoken");

const authorize = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if(!authHeader) {
        return res.status(403).send({message: "no token provided"});
    }

    const [bearerWord, bearerToken] = authHeader.split(" ");

    if (bearerWord !== "Bearer" || !bearerToken) {
        return res.status(403).send({message: "Invalid header format"});
    }

    try {
        const decoded = jwt.verify(bearerToken, "key");
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send({message: "Token is Invalid"});
    }
};

module.exports = authorize;