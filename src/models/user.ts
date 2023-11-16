import {Schema, Types, model, Model} from "mongoose";
import { User } from "../interface/user.interface";

const UserSchema = new Schema<User> (
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        rol: { type: String, required: true, enum:["admin", "user"] },
    },
    {
        timestamps:true,
        versionKey:false,
    }
)
const UserModel = model('user',UserSchema);
export default UserModel;