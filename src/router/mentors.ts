import express from 'express';

import { getAllMentors, newMentor, deleteMentorsRole, updateMentorsRole  } from '../controllers/mentors-register';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
    router.post('/mentorship', newMentor);
    router.get('/mentorship', isAuthenticated,  getAllMentors);
    router.delete('/mentorship/:id', isAuthenticated,  deleteMentorsRole);
    router.patch('/mentorship/:id', isAuthenticated,  updateMentorsRole);
}