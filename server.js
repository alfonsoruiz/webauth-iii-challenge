const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');

server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);

module.exports = server;
