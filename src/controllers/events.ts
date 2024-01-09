import express from 'express';

import { getEvents, getEventById,  deleteEventById, createEvent } from '../Models/events';

export const getAllEvents = async (req: express.Request, res: express.Response) => {
    try {
        const events = await getEvents();
    return res.status(200).json(events);
    } catch (error) {
        console.error(error);
    return res.sendStatus(400);
    }
}

export const getEvent = async (req: express.Request, res: express.Response) => {
    try {
    const { id } = req.params;
    const events = await getEventById(id);
    return res.status(200).json(events);
    } catch (error) {
        console.error(error);
    return res.sendStatus(400);
    }
}

export const newEvent = async (req: express.Request, res: express.Response) => {

        try {
            const { title, stack, event, location, date, platform } = req.body;
            const newEvent = await createEvent({
                title, stack, event, location, date, platform, registrations: [],
        });
        return res.status(201).json(newEvent);
        } catch (error) {
            console.error(error);
        return res.sendStatus(500);
    }
};


// Update an event
export const updateEvent = async (req: express.Request, res: express.Response) => 
{
    try {
        const { id } = req.params;
        const { title, stack, event, location, date, platform } = req.body;

        const events = await getEventById(id);

        events.title = title,
        events.stack = stack,
        events.location = location,
        events.date = date,
        events.platform = platform,
        events.event = event

        await events.save()
            if (events) {
                return res.status(200).json(events);
            } else {
            return res.status(404).json({ error: 'Event not found' });
            }
            } catch (error) {
                console.error(error);
                return res.sendStatus(500);
    }
};

// Delete an event
export const deleteEvent = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deleteEvent = await deleteEventById(id);
        return res.json(deleteEvent)

    }catch (error){

    }
}

// Register for an event
export const registerForEvent = async (req: express.Request, res: express.Response) => {

  try {
    const { id } = req.params;
    const { firstname, lastname, email, phone_number } = req.body;
    const event = await getEventById(id);

    if (event) {
        const newUser = { firstname, lastname, email, phone_number };
        event.registration.push(newUser);

        await event.save();
        return res.status(200).json({ message: `Registered for event ${id}`, user: newUser });
        } else {
        return res.status(404).json({ error: 'Event not found' });
    }
    } catch (error) {
    console.error(error);
    return res.sendStatus(500);
    }
};


//get all registered attendees for an event
export const getAllRegisteredUsers = async (req: express.Request, res: express.Response) => {

    try {
        const {id} = req.params
        const event = await getEventById(id);

    if (event) {
        const attendeess = event.registration;
        return res.status(200).json(attendeess);
    } else {
        return res.status(404).json({ error: 'Event not found' });
    }
    } catch (error) {
    console.error(error);
    return res.sendStatus(500);
    }
};