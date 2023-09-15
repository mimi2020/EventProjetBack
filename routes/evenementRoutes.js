var express = require("express");
const EvenementRoute = express.Router();
//const UserController = require("../controllers/userController")
var EvenementController = require("../controllers/evenementController");
const upload = require("../middelware/upload");






EvenementRoute.post("/Create", upload.single("photo"), EvenementController.createEvent);
EvenementRoute.get("/List", EvenementController.listEvenements);
EvenementRoute.delete("/Delete/:id", EvenementController.deletetEvenement);
EvenementRoute.get("/GetOne/:id", EvenementController.FindEvenement);
EvenementRoute.put("/Update/:id", upload.single("photo"), EvenementController.UpDateEvenement);
EvenementRoute.get("/FindByOrganiser/:id", EvenementController.FindEventByOrganizer);



module.exports = EvenementRoute