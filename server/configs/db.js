import mongoose from 'mongoose'
const Connection = async () => {
    try{
        //console.log(mongoose.connect(process.env.MONGO_URI))
        //output: Promise { <pending> }
        //because the process was not finised yet, its async function
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI)
        // console.log(connectionInstance);
        //output: <ref *1> Mongoose {...}
    
        console.log("Database Connection succesful.".green);
    }
    catch(e){
        throw new Error(e);
    }
}
export default Connection