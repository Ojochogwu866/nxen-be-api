import express from 'express'
import authentication from './authentication';
import users from './users';
import events from './events';

const router = express.Router();

export default (): express.Router => {

    authentication(router);
    users(router);
    events(router);
    return router;
}