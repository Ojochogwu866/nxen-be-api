import express from 'express';

import { getAllEvents, getEvent, newEvent, updateEvent, deleteEvent, registerForEvent, getAllRegisteredUsers } from '../controllers/events';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
    router.post('/events/new-event', isAuthenticated,  newEvent);
    router.post('/events/:id/register', registerForEvent);
    router.get('/events',  getAllEvents);
    router.get('/events/:id',  getEvent);
    router.get('/events/:id/registered-users', isAuthenticated, getAllRegisteredUsers)
    router.delete('/events/:id/delete', isAuthenticated,  deleteEvent);
    router.patch('/events/:id/update', isAuthenticated,  updateEvent);
}