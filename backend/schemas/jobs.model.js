import { timeStamp } from "console";
import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirements:[{
        type:String,
    }],
    salary:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    experienceLevel :{
        type:Number,
        required:true
    },
    posotion:{
        type:Number,
        required:true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true

    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true
    },
    application:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Application',
        }
    ]

},{timestamps:true})

export const Job = mongoose.model("Job",jobSchema)