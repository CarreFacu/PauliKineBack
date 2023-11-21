import { Request, Response } from "express";
import UserModel from "../models/user";
import { User } from "../interface/user.interface";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
        body.password = await bcrypt.hash(body.password, 10);
        const newUser = await UserModel.create(body);
        res.status(201).json(newUser)
    }catch (e){
        console.error('Error to create a new User:', e);
        res.status(500).json({ error: 'Error to create a new User' });
    }

}

export const deleteUser= async (req: Request, res: Response) => {
    try {
        const { idUser } = req.params
        const deleteUser:User|null = await UserModel.findByIdAndDelete({ _id: idUser });
        if(deleteUser == null){
            res.status(404).json({ error: 'The resource you are trying to delete was not found.' })
        }else{
            res.status(200).json(deleteUser)
        }
    }catch (e){
        console.error('Error to delete a person:', e);
        res.status(500).json({ error: 'Error to delete a person' });
    }

}

export const logIn= async (req: Request, res: Response) => {
    try {
        let body: User = req.body;req.body
        const UserLogIn: User|null = await UserModel.findOne({username: body.username})
        if (UserLogIn == null){
            return res.status(400).json({
                msg: `No user found with that name. ${body.username}`
            })
        }
        const passwordValid:boolean = await bcrypt.compare(body.password, UserLogIn.password)
        if (!passwordValid) {
            return res.status(400).json({
                msg: `Incorrect Password for the user. ${body.username}`
            })
        }
        const token:string = jwt.sign({
            username: UserLogIn.username, rol: UserLogIn.rol
        }, process.env.SECRET_KEY || 'secret~token',{expiresIn: "8h"});
        res.status(200).json(token)
    }catch (e){
        console.error('Error to login with the user', e);
        res.status(500).json({ error: 'Error to login with the user' });
    }

}