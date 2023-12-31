import { Request, Response } from "express"
import PersonModel from "../models/person"
import { Person } from "../interface/person.interface"

export const getAllPerson= async (_req: Request, res: Response) => {
    try {
        const listPerson:Person[] = await PersonModel.find()
        res.status(200).json(listPerson)
    }catch (e){
        console.error('Error to get person list:', e);
        res.status(500).json({ error: 'Error to get person list' });
    }

}

export const deletePerson= async (req: Request, res: Response) => {
    try {
        const { idPerson } = req.params
        const deletePerson:Person|null = await PersonModel.findByIdAndDelete({ _id: idPerson });
        if(deletePerson == null){
            res.status(404).json({ error: 'The resource you are trying to delete was not found.' })
        }else{
            res.status(200).json(deletePerson)
        }
    }catch (e){
        console.error('Error to delete a person:', e);
        res.status(500).json({ error: 'Error to delete a person' });
    }

}

export const newPerson= async (req: Request, res: Response) => {
    try {
        let body: Person = req.body;
        const newPerson:Person = await PersonModel.create(body);
        res.status(201).json(newPerson)
    }catch (e){
        console.error('Error to create a new person:', e);
        res.status(500).json({ error: 'Error to create a new person' });
    }

}