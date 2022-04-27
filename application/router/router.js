const express = require('express');
const BaseRouter = require('./baseRouter.js');
const router = express.Router();

function Router({ users }) {

    const baseRouter = new BaseRouter;

    return router;
}

module.exports = Router;