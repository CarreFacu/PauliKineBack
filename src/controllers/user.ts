import { Request, Response } from "express"
import UserModel from "../models/user"
import { User } from "../interface/user.interface"
import bcrypt from 'bcrypt'
export const getAllUser= async (_req: Request, res: Response) => {
    try {
        const listUser = await UserModel.find()
        res.status(200).json(listUser)
    }catch (e){
        console.error('Error to get User list:', e);
        res.status(500).json({ error: 'Error to get User list' });
    }

}

export const newUser= async (req: Request, res: Response) => {
    try {
        let body: User = req.body;
        if (await UserModel.findOne({username: body.username})){
            return res.status(400).json({
                msg: `It already exists a user with that name. ${body.username}`
            })
        }
        const hashedPassword = await bcrypt.hash(body.password, 10);
        body.password = hashedPassword;
        const newUser = await UserModel.create(body);
        res.status(200).json(newUser)
    }catch (e){
        console.error('Error to create a new User:', e);
        res.status(500).json({ error: 'Error to create a new User' });
    }

}