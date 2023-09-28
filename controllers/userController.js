const UserModel = require("../models/userModel")  // importation de Model User
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")
const SECRET = `${process.env.SECRET}`
require("dotenv").config();
var bcrypt = require('bcryptjs');
const userModel = require("../models/userModel");
const argon2 = require("argon2");




var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "0e10dffdf191cd",
        pass: "3ed4a6f7ff88fb"
    }
});


const password = 'pass123';
var hashedPassword;

module.exports = {

    createUser: async function (request, res) {
        //console.log('****data is',request.body);
        const data = {
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
            photo: request.file.filename,
            adresse: request.body.adresse,
            phone: request.body.phone,
            role: request.body.role,
            cin: request.body.cin,
            files: request.files
        }
        console.log("**data**", data)
        var user = await UserModel.create(data)
            .then(async (obj) => {

                const hash = await argon2.hash(data.password);
                console.log("hashed pass is**", hash);
                console.log("obj is**", obj);
                await UserModel.updateOne({ _id: obj._id }, { "password": hash });
                // Affichage Post MAn
                // var newuser = UserModel.findById({ _id: obj._id }).exec().then((obj1) => {
                //     res.send({ status: 200, data: obj1 })
                // })


            })
    },

    // createUser: async function (request, result) {

    //     const data = {
    //         firstname: request.body.firstname,
    //         lastname: request.body.lastname,
    //         email: request.body.email,
    //         password: request.body.password,
    //         photo: request.file.filename,
    //         adress: request.body.adress,
    //         phone: request.body.phone,
    //         cin: request.body.cin,
    //         role: request.body.role
    //     }
    //     console.log("data is ", data)
    //     await UserModel.create(data)

    //         .then((result) => {
    //             result.send({ status: 200, data: data })
    //             console.log("****result is***", result)
    //         })

    //         .catch((error) => {

    //             result.send({ status: 500, data: data })
    //         })

    //     bcrypt.genSalt(10, function (err, Salt) {
    //         // The bcrypt is used for encrypting password.
    //         bcrypt.hash(data.password, Salt, async function (err, hash) {
    //             if (err) { return console.log('Cannot encrypt'); }
    //             hashedPassword = hash;
    //             console.log("hashedPassword is", hashedPassword);
    //             //ta9ef ici la fonction matemchich l autre


    //         })
    //     });




    listUsers: async function (request, result) {

        UserModel.find({})
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
                result.status(500)
                    .json({
                        message: "Echec d avoir la liste",
                        status: 500
                    })
            })

    },

    DeletetUsers: async function (request, result) {

        UserModel.deleteOne({ _id: request.params.id })
            .then(function (oneuser) {

                result.json({
                    status: 200,
                    data: oneuser


                })
            })

            .catch(function (err) {
                result.status(500).json({
                    message: "Echec de suppression",
                    status: 500
                })
            })


    },

    FindUser: async function (request, result) {

        UserModel.findById({ _id: request.params.id })


            .then(function (oneuser) { // Retour de la fonction FindUSer je croix !!! ou de findById ??? a questionner

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


    FindUserByCIN: async function (request, result) {

        UserModel.findOne({ cin: request.params.cin })


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

    FindUserByEmail: async function (request, result) {

        UserModel.findOne({ email: request.params.email })


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



    FindUserByRole: async function (request, result) {

        UserModel.find({ role: request.params.role })


            .then(function (alluser) {

                result.json({
                    status: 200,
                    data: alluser


                })
            })

            .catch(function (err) {
                result.status(500).json({
                    message: "Echec Recherche",
                    status: 500
                })
            })



    },
    UpDateUser: async function (request, result) {
        UserModel.updateOne({ _id: request.params.id }, request.body)


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


    SendMail: async function (request, result) {

        const data = request.body;

        console.log("data is ", data)

        try {


            await transport.sendMail(


                {
                    to: data.email,
                    from: "Admin@event.com",
                    subject: "Welcome" + "" + data.name,
                    text: "bonjour mr",
                    html: `<!DOCTYPE html>
                    <html>
                    <head>
                    <meta charset="utf-8"
                    <meta http-equiv="x-ua-compatible" content="ie=edge">
                    <title> Welcome EMail </title>
                    </head>
                    <body>
                    <h2> Hello ${data.name} ! </h2>
                    <p> We want to send yuou an email at : ${data.email}</p>
                    <p> Please be noted that : ${data.txt}</p>
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
    },

    Login: async function (request, result) {

        var email = request.body.email; //??
        var password = request.body.password;//??

        // try {
        //  const { email, password } = request.body; //??
        const user = await UserModel.findOne({ email })
        if (user) {

            const passwordValid = await argon2.verify(user.password, password);
            if (!passwordValid) {
                return (result.status(400).json({ status: 400, massage: "ivalid pasword" }));
            }

            const token = jwt.sign({ id: user._id, user: user }, "pfe", { expiresIn: "7 days" });
            console.log("token is ", token);

            const data = { user: user, token: token, expiresIn: 7 };

            if (token != null) {
                return await result.status(200).json({ status: 200, message: data })
            }

        }

        else {
            return result.json({ status: 400, message: "user not found" })
        }


        

    },



    changePassword: async function (request, result) {


        user = UserModel.findById({ _id: request.params.id }).exec()
            .then(async (obj) => { // D ou il importe l ID
                console.log(obj)

                console.log("User is before", obj.password)
                // const user = UserModel.updateOne({ _id: request.params.id }, request.body)
                console.log("User is Later", request.body)

                var oldpasssword = obj.password;
                console.log(request.body.password)
                var hash = await argon2.hash(request.body.password);
                console.log(hash)


                if (hash == oldpasssword) {

                    console.log(" passord is the same")

                }


                else {

                    console.log(" passord is not the same")

                    await UserModel.updateOne({ _id: obj._id }, { "password": hash });

                }

                result.json({ status: 200, message: "password is updated" })
            })

    },

    resetPassword: async function (request, result) {

        const data = request.body;

        console.log("data is ", data)

        try {

            const generateRandomString = () => {
                return Math.floor(Math.random() * Date.now()).toString(36);
            };

            console.log(generateRandomString());


            transport.sendMail(


                {
                    to: data.email,
                    from: "Admin@event.com",
                    subject: "Welcome" + "" + data.name,
                    text: "bonjour mr",
                    html: `<!DOCTYPE html>
                    <html>
                    <head>
                    <meta charset="utf-8"
                    <meta http-equiv="x-ua-compatible" content="ie=edge">
                    <title> Welcome EMail </title>
                    </head>
                    <body>
                    <h2> Hello ${data.name} ! </h2>
                    <p> We want to send yuou an email at : ${data.email}</p>
                    <p> Please be noted that new password IS : ${generateRandomString()}</p>
                    <br>
                    </body>
                    </html>
                    `
                },




                async function (err, info) {
                    if (err)
                        console.log(err);
                    else {
                        user = UserModel.findById({ _id: request.params.id }).exec()
                            .then(async (obj) => { // D ou il importe l ID
                                console.log(obj)


                                var hash = await argon2.hash(generateRandomString());
                                console.log(hash)
                                await UserModel.updateOne({ _id: obj._id }, { "password": hash });
                                result.json({ status: 200, message: "password is updated" })
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
    },

    logout: async function (request, result) {

        user = UserModel.findById({ _id: request.params.id }).exec()
            .then(async (obj) => { // D ou il importe l ID
               // console.log(obj);



                result.clearCookie("access_token")
                    .json({ status: 200, message: "not connected" })
            })



    }

}