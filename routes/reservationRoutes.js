var express = require("express");




const ReservationRoute = express.Router();

var ReservationController = require("../controllers/reservationController");
//const upload = require("../middelware/upload");


ReservationRoute.post("/Create", ReservationController.createReservation);
ReservationRoute.get("/List", ReservationController.listReservations);
ReservationRoute.delete("/Delete/:id", ReservationController.deletetReservation);
ReservationRoute.get("/GetOne/:id", ReservationController.findReservation);
ReservationRoute.get("/GetClientReservations/:id", ReservationController.findReservationsByClient);
ReservationRoute.put("/Update/:id", ReservationController.UpDateReservation);










module.exports = ReservationRoute




