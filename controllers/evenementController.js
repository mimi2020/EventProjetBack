const EvenementModel = require("../models/evenementModel");
const nodemailer = require("nodemailer")
const CategoryModel = require("../models/categorieModel")

module.exports = {


    // createEvenement: async function (request, result) {

    //     const data = {
    //         name: request.body.name,
    //         description: request.body.description,
    //         photo: request.file.filename,
    //         // file: request.body.file,//sala7eha cette
    //         localisation: request.body.localisation,
    //         organizer: request.body.organizer,
    //         periode: request.body.periode,
    //         budgetevent: request.body.budgetevent,
    //         price: request.body.price,

    //     }





    //     console.log("data is ", data)
    //     const newObject = EvenementModel.create(data)

    //         .then((result) => {
    //             result.send({ status: 200, data: data })

    //         })

    //         .catch((error) => {

    //             result.send({ status: 500, data: data })
    //         })
    // },

    createEvent: async function (request, result) {
        const data = {
            name: request.body.name,
            description: request.body.description,
            file: request.body.file,
            photo: request.file.filename,
            location: request.body.location,
            organizer: request.body.organizer,
            period: request.body.period,
            budgetEvent: request.body.budgetEvent,
            price: request.body.price,
            equipement: request.body.equipement,
            category: request.body.category,
            tags: request.body.tags
        }
        console.log("Event data is ", data)
        var ID;//créer vide pour le remplir ultérieurmrnt
        const newObject = await EvenementModel.create(data)
            .then((obj) => {
                result.send({ status: 200, data: data });
                console.log('*******ID obj created is *******', obj._id);
                ID = obj._id

            });


        var data2;
        await CategoryModel.findById({ _id: data.category }).exec().then((resCat) => {
            console.log("details of category created ", resCat);
            console.log("list of events the this category before push", resCat.ListOfEvents);
            //pour ajouter un element à un tableau en js on utilise la fonction push
            //il s'agit d'ajouter l'evenement d"ja créer dans la ligne 57 à la liste  des évevenemnt 'ListOfEvents] dansla categorie convénable
            resCat.ListOfEvents.push(ID);//??
            console.log("list of events the this category after push", resCat.ListOfEvents);
            data2 = {
                "ListOfEvents": resCat.ListOfEvents
            }

        });

        await CategoryModel.updateOne({ _id: data.category }, data2)

    },






    listEvenements: async function (request, result) {

        EvenementModel.find({})
            .populate('organizer')
            .populate('category')
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

    deletetEvenement: async function (request, result) {
        //console.log("Affiche", request.params.id)
        EvenementModel.deleteOne({ _id: request.params.id })
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



    FindEvenement: async function (request, result) {

        EvenementModel.findById({ _id: request.params.id })
            .populate('organizer')
            .populate('category')
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


    UpDateEvenement: async function (request, result) {
        console.log("****", request.body)

        EvenementModel.updateOne({ _id: request.params.id }, request.body)

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



    // A tester Post Man





    FindEventByOrganizer: async function (request, result) {

        EvenementModel.find({ organizer: request.params.id })


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



