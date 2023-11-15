import express from 'express'

import { createInterest, getInterest, getInterestsByEmail } from '../Models/community';


//get all interested candidates 

export const getAllCandidates = async (req: express.Request, res: express.Response) => {
    try {
        const interests = await getInterest();
    return res.status(200).json(interests);
    } catch (error) {
        console.error(error);
    return res.sendStatus(400);
    }
}


// register new interest 

export const newInterest = async (req: express.Request, res: express.Response) => {

        try {
            const { options, email } = req.body;
            const newEvent = await createInterest({
                options, email,
        });
        const existingSubmission = await getInterestsByEmail(email);
        if (existingSubmission){
            return res.status(400).json('You have submitted a response already!.')
        }
        return res.status(201).json(newEvent);
        } catch (error) {
            console.error(error);
        return res.sendStatus(500);
    }
};