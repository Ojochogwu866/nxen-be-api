import express from 'express'
import authentication from './authentication';
import users from './users';
import events from './events';
import community from './community';
import mentors from './mentors';

const router = express.Router();

export default (): express.Router => {

    authentication(router);
    users(router);
    events(router);
    community(router);
    mentors(router);
    return router;
}