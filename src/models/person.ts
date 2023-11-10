import {Schema, Types, model, Model} from "mongoose";
import { Person } from "../interface/person.interface";

const PersonSchema = new Schema<Person> (
    {
        name:{
            type: String,
        },
        surname:{
            type: String,
        },
        birthdate:{
            type: Date,
        },
        phone:{
            type: Number,
        },
        gender:{
            type: String,
            enum:["F", "M"]
        }
    },
    {
        timestamps:true,
        versionKey:false,
    }
)
const PersonModel = model('person',PersonSchema);
export default PersonModel;