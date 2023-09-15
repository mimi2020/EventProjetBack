const {connect} = require('mongoose');
const{error,success} = require("consola");
var DB="mongodb://127.0.0.1/evenements";

const connectDB = async () =>{

    try{
        await connect (DB);
        success({
        message: `success to connect to DB \n${DB}`,
    })
    
}
    catch (error) {

            console.log(error);

            connectDB();
        }
    
};

module.exports = connectDB();