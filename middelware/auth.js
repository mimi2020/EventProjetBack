const JWT = require("jsonwebtoken");
require("dotenv").config();
const SECRET = `${process.env.SECRET}`

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    console.log("**token**", token)
    const decodedToken = JWT.verify(token, "pfe", function (err, res) {
        if (err) {
            console.log("**decodedToken**", err)
        } else {
            console.log("**decodedToken in else**", res)
            const userid = res.id;
            console.log("*****userID**",userid);
            if(userid !==null)
            {
            next();

            }
            else{
                res.status(400).json({
                    error: "invalid Request"
        
                })
            }
        }
    });


  




}