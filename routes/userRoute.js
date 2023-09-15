var express = require("express");
const UserController = require("../controllers/userController")
const upload = require("../middelware/upload");
const auth=require("../middelware/auth")



const UserRoute = express.Router();



UserRoute.post("/Create", upload.single("photo"), UserController.createUser);
UserRoute.get("/List", auth, UserController.listUsers);
UserRoute.delete("/Delete/:id", UserController.DeletetUsers);
UserRoute.get("/GetOne/:id", UserController.FindUser);
UserRoute.get("/FindOne/:cin", UserController.FindUserByCIN);
UserRoute.put("/Update/:id", UserController.UpDateUser);
UserRoute.get("/FindUserByRole/:role", UserController.FindUserByRole);
UserRoute.get("/FindUserByEmail/:email", UserController.FindUserByEmail);


UserRoute.post("/SendMail", UserController.SendMail);
UserRoute.post("/Login", UserController.Login);
UserRoute.put("/ChangePWD/:id", UserController.changePassword);
UserRoute.post("/ResetPWD/:id", UserController.resetPassword);
UserRoute.get("/Logout/:id", UserController.logout);


//UserRoute.get("/test", UserController.test)


module.exports = UserRoute
