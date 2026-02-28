import 'dotenv/config';
import 'colors';
import app from "./app.js";
import Connection from './configs/db.js';
import mongoose from 'mongoose';
let server;
const startServer = async ()=>{
    try{
        console.log("Starting Server".blue);
        await Connection();
        server = app.listen(process.env.PORT, ()=>{
            console.log("Server is now on.".green);
        });
    }
    /*
    catch(MongooseError e){
        console.log("There was a problem in connecting to the DB.\n Error is:".red, e.message);
    }
    catch(e){
        console.log("There was a problem in running the server.\n Error is:".red, e.message);
    }
    */
   catch (e) {
    if (e instanceof mongoose.Error) {
        console.log("There was a problem connecting to the DB.\nError is:".red, e.message);
        process.exit(1, "DB Error")
    }
     
    else {
        console.log("There was a problem running the server.\nError is:".red, e.message);
        process.exit(1,"Server Error")
    }
}
}
const stopServer = async ()=>{
    try {
        console.log("Stopping Server".blue);
        await mongoose.disconnect();
        console.log("DB is closed".green);
        server.close(()=>{
            console.log("Server is closed".green);
            process.exit(0);
        });
    } catch (e) {
        if (e instanceof mongoose.Error) {
        console.log("There was a problem closing the DB.\nError is:".red, e.message);
            process.exit(1,"DB Error")
        } 
        else {
            console.log("There was a problem closing the server.\nError is:".red, e.message);
            process.exit(1,"Server Error")
        }
    }
}

process.on("SIGINT", stopServer);
process.on("SIGTERM", stopServer);
startServer();

