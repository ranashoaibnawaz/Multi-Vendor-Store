const jwt = require("jsonwebtoken");
const USER = require("../Models/UserSchema");
const secreteKey = process.env.KEY;

const Authenticate = async(req,res,next) =>{
    try {
        const token = req.cookies.AmazonWeb;
        const VerifyToken = jwt.verify(token,secreteKey);
        console.log(VerifyToken);

        const UserCart = await USER.findOne({_id:VerifyToken._id,"tokens.token":token})
        console.log(UserCart);

        if(!UserCart)
        {
            throw new Error("Audentification Failed")
        };

        req.token = token
        req.UserCart = UserCart
        req.UserId = UserCart._id
        next();

    } catch (error) {
        res.status(401).send("Audentification Failed");
        console.log(error);
    }
}

module.exports = Authenticate;