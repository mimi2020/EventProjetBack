const CategorieModel = require("../models/categorieModel");



module.exports = {
    createCategorie: async function (request, result) {

        const data = {
            name: request.body.name,
            description: request.body.description,
            photo: request.file.filename,
            budget: request.body.budget,

        }
        console.log("data is ", data)
        const newObject = CategorieModel.create(data)

            .then((result) => {
                result.send({ status: 200, data: data })

            })

            .catch((error) => {

                result.send({ status: 500, data: data })
                //console.log(error)
            })
    },



    listCategories: async function (request, result) {

        CategorieModel.find({})
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

    deletetCategorie: async function (request, result) {
        //console.log("Affiche", request.params.id)
        CategorieModel.deleteOne({ _id: request.params.id })
            .then(function (onecategorie) {

                result.json({
                    status: 200,
                    data: onecategorie


                })
            })

            .catch(function (err) {
                result.status(500).json({
                    message: "Echec de suppression",
                    status: 500
                })
            })


    },

    FindCategorie: async function (request, result) {

        CategorieModel.findById({ _id: request.params.id })


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

    UpDateCategorie: async function (request, result) {
        CategorieModel.updateOne({ _id: request.params.id }, request.body)


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


    UpDateCategorieWithPhoto: async function (request, result) {

        const newData = {

            name: request.body.name,
            description: request.body.description,
            photo: request.file.filename,
            budget: request.body.budget

        }
        CategorieModel.updateOne({ _id: request.params.id }, newData)


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


