import mongoose from "mongoose";

const RideSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    captainId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Captain'
    },
    origin:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    },
    fare:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['pending','ongoing','accepted','cancelled','completed'],
        default:'pending'
    },
    distance:{
        type:Number
    },
    duration:{
        type:Number
    },
    paymentId:{
        type:String
    },
    orderId:{
        type:String
    },
    signature:{
        type:String
    },
    otp:{
        type:String,
        select:false
    }


},{timestamps:true})

const Ride=mongoose.model('Ride',RideSchema);
export default Ride;