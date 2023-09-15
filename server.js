//Partie 1 Declaration
const port = 3000;
const { consola } = require("consola");
const express = require("express")
const App = express()
var { error, success } = require('consola');
var bodyparser = require('body-parser')
const cors = require('cors');
const DB = require('./config/database')
const UserRoute = require("./routes/userRoute");//correcte
const CategoriesRoute = require("./routes/categoriesRouts");
const EvenementRoute = require("./routes/evenementRoutes");
const ReservationRoute = require("./routes/reservationRoutes")




//Partie Configuration
const path = require('path')
App.use(express.json())
App.use(bodyparser.json())
App.use(bodyparser.urlencoded({ extended: true }))
App.use(cors({
    origine: "http://localhost:3000/"
    , methodes: ["POST", "PUT", "DELETE", "GET", "PATCH"]

}))
App.use("/User", UserRoute)
App.use("/Categorie", CategoriesRoute)
App.use("/Event", EvenementRoute)
App.use("/Reservation", ReservationRoute)
App.use(express.static('public'));
App.use('/storages', express.static(path.join(__dirname, 'storages')));

//Partie Execution

App.listen(port, async () => {
    try {
        success(
            {
                message: `success to connect via port :${port}`,
                badge: true
            }
        )
    } catch (error) {
        error({
            message: "failed to connect",
            badge: true

        })
    }

}
)