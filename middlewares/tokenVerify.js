const express = require("express");
const jwt = require("jsonwebtoken");
const tokenRouter = express.Router();

tokenRouter.use(function(req, res, next) {
    const token = req.headers.authorization.slice(7);
    if (token) {
        console.log({token});
        jwt.verify(token, "SECRET", (err, decoded) => {
            if (err) {
                res.status(401).json({
                    message: "Invalid token",
                    error: err
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    }
    else{ 
        res.status(401).json({
            message: "No token provided"
        });
    }
});

module.exports = tokenRouter;