import express from 'express';

import { getAllCandidates, newInterest } from '../controllers/community';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
    router.post('/community/',  newInterest);
    router.get('/community',  isAuthenticated, getAllCandidates);
}