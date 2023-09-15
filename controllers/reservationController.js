//const EvenementModel = require("../models/evenementModel");

const evenementModel = require("../models/evenementModel");
const ReservationModel = require("../models/reservationModel");
const userModel = require("../models/userModel");
const nodemailer = require("nodemailer")//copier coller userController 

var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "0e10dffdf191cd",
        pass: "3ed4a6f7ff88fb"
    }
});


module.exports = {


    createReservation: async function (request, result) {

        const data = {
            idClient: request.body.idClient,
            idEvent: request.body.idEvent,

        }
        //pour créer la fonction de résearvation
        const newObject = await ReservationModel.create(data).then(() => {
            result.send({ status: 200, data: data });//result seen on postman success to create ((affichage))

        });
        //pour envoyer un email, il faut tout d'abord avoir email (detail de user)
        //j'ai uniquement idClient==>pour arriver à voir l'objet user(naame,email,fisrtaname,.....)
        //il fut crer une variable nommé user et je met en elle le resultat de la fonctoon getbuId applique à userModel

        //detail event
        var name = "";
        var description = "";
        var localisation = "";


        let event = await evenementModel.findById({ _id: data.idEvent })
            .exec()
            .then(function (oneevent) {


                //j'ai besoin d'un traitement apres d'avoir le resultat de findById()==>resultet oneuser
                //pour vérifier l'aces auw detail j'ai testé par console.log(oneuser.email)[[idClient====>email, firstnamen, lastname, cin,,]]
                console.log('user is', oneevent);
                console.log('user name is', oneevent.name);
                console.log('user description is', oneevent.description);
                console.log('user localisation is', oneevent.localisation);
                name = oneevent.name;
                description = oneevent.description;
                localisation = oneevent.localisation;
            });
        console.log(name)
        console.log(description)
        console.log(description)

        let user = await userModel.findById({ _id: data.idClient })
            .exec()
            .then(function (oneuser) {


                //j'ai besoin d'un traitement apres d'avoir le resultat de findById()==>resultet oneuser
                //pour vérifier l'aces auw detail j'ai testé par console.log(oneuser.email)[[idClient====>email, firstnamen, lastname, cin,,]]
                console.log('user is', oneuser);
                console.log('user email is', oneuser.email);
                let email = oneuser.email;
                let firstname = oneuser.firstname;
                let lastname = oneuser.lastname;
                let cin = oneuser.cin;


                try {

                    transport.sendMail(
                        {
                            to: email,
                            from: "Admin@event.com",
                            subject: "Welcome" + "" + firstname + "" + lastname,
                            text: "bonjour mr",
                            html: `<!DOCTYPE html>
                    <html>
                    <head>
                    <meta charset="utf-8"
                    <meta http-equiv="x-ua-compatible" content="ie=edge">
                    <title> Welcome EMail </title>
                    </head>
                    <body>
                    <h2>Event reservation ! </h2>
                    <h2> Hello ${firstname} ! </h2>
                    <p> We want to inform you that your reservation id done for cin :${cin} </p>
                    <p> Your event is Name:${name} </p>
                    <p> Your event details is:${description} </p>
                    <p> Your event is localisation is:${localisation} </p>
                    <br>
                    </body>
                    </html>
                    `


                        },

                        function (err, info) {
                            if (err)
                                console.log(err)
                            else {
                                result.status(200).json({

                                    status: 200,
                                    message: info
                                })
                            }


                        })
                }

                catch (error) { // Verif

                    result.status(400).json({

                        status: 400,
                        message: error.message
                    })



                }




            })
            .catch(function (err) {
                result.status(500).json({
                    message: "Echec Recherche",
                    status: 500
                })
            })


    },




    listReservations: async function (request, result) {

        ReservationModel.find({})
            .populate('idClient')
            .populate('idEvent')
            .exec()
            .then(function (list) {// list = retour de la fonction ListOfUsers

                // if (result) {

                result.status(200).json({
                    message: "Succes  d avoir la liste",
                    status: 200,
                    data: list
                })
            })
            // } else { 
            .catch(function (err) {
                result.status(500).json({
                    message: "Echec d avoir la liste",
                    status: 500
                })
            })

    },


    deletetReservation: async function (request, result) {
        //console.log("Affiche", request.params.id)
        ReservationModel.deleteOne({ _id: request.params.id })
            .then(function (oneevent) {

                result.json({
                    status: 200,
                    data: oneevent


                })
            })

            .catch(function (err) {
                result.status(500).json({
                    message: "Echec de suppression",
                    status: 500
                })
            })


    },


    findReservation: async function (request, result) {

        ReservationModel.findById({ _id: request.params.id })
            .populate('idClient')
            .populate('idEvent')
            .exec()

            .then(function (oneuser) {

                result.json({
                    status: 200,
                    data: oneuser


                })
            })

            .catch(function (err) {
                result.status(500).json({
                    message: "Echec Recherche",
                    status: 500
                })
            })



    },

    findReservationsByClient: async function (request, result) {

        ReservationModel.find({ idClient: request.params.id })
            .populate('idClient')
            .populate('idEvent')
            .exec()

            .then(function (oneuser) {

                result.json({
                    status: 200,
                    data: oneuser


                })
            })

            .catch(function (err) {
                result.status(500).json({
                    message: "Echec Recherche",
                    status: 500
                })
            })



    },

    UpDateReservation: async function (request, result) {
        console.log("****", request.body)

        ReservationModel.updateOne({ _id: request.params.id }, request.body)

            .then(function (oneuser) {

                result.json({
                    status: 200,
                    data: oneuser


                })
            })

            .catch(function (err) {
                result.status(500).json({
                    message: "Echec Recherche",
                    status: 500
                })
            })



    },


}