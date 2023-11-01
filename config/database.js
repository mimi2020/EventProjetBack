const {connect} = require('mongoose');
const{error,success} = require("consola");
const { MongoClient } = require('mongodb');
// var DB="mongodb://127.0.0.1/evenements";
var DB="mongodb+srv://test1:test1@cluster0.moznla4.mongodb.net/rimtest?retryWrites=true&w=majority";
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

// async function main(){
//     /**
//      * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
//      * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
//      */
//     const uri = "mongodb+srv://test1:test1@cluster0.moznla4.mongodb.net/rimtest?retryWrites=true&w=majority";


//     const client = new MongoClient(uri);

//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();

//         // Make the appropriate DB calls
//     // await  listDatabases(client);

//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }

// main().catch(console.error);