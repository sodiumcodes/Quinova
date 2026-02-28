import mongoose from 'mongoose'
const Connection = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connection succesful.".green);
    }
    catch(e){
        throw new Error(e);
    }
}
export default Connection