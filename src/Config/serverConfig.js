import dotenv from "dotenv";

dotenv.config();

const PORT=process.env.PORT;
const MONGO_DB_URI=process.env.MONGO_DB_URI;
const SALT=parseInt(process.env.SALT);
const JWT_SECRET=process.env.JWT_SECRET;
const GOOGLE_CLOUD_API=process.env.GOOGLE_CLOUD_API;
const BASE_FARE=parseInt(process.env.BASE_FARE)
const PER_KM_RATE=parseInt(process.env.PER_KM_RATE);
export {
    PORT,
    MONGO_DB_URI,
    SALT,
    JWT_SECRET,
    GOOGLE_CLOUD_API,
    BASE_FARE,
    PER_KM_RATE
}