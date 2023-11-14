import express from 'express';

import { getUsers, deleteUserById, getUserById } from "../Models/user";

export const getAllUsers= async (req: express.Request, res: express.Response) => {
    try{
        const users = await getUsers();

        return res.status(200).json(users);
    }catch ( error){
        console.log(error);

        return res.sendStatus(403)
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deleteUser = await deleteUserById(id);
        return res.json(deleteUser)

    }catch (error){

    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { email, password } = req.body;

        if (!email || !password){
            return res.sendStatus(400)
        }
        const user = await getUserById(id);

        user.email = email; 
        user.authentication.password = password;
        await user.save();

        return res.status(200).json(user).end();
    }catch(error){
        console.log(error);
        return res.sendStatus(403)
    }
}