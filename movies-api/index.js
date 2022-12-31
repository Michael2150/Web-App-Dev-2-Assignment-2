import dotenv from 'dotenv';
import express from 'express';
import './db';
import moviesRouter from './api/movies';
import usersRouter from './api/users';
import syncRouter from './api/sync';
import passport from './authenticate';

dotenv.config();

const errHandler = (err, req, res, next) => {
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Error Stacktrace: ${err.stack} `);
};

const app = express();
const port = process.env.PORT;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api/movies', passport.authenticate('jwt', {session: false}), moviesRouter);
app.use('/api/users', usersRouter);
app.use("/api/sync", syncRouter);
app.use(errHandler);
app.use(passport.initialize());

app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}/`);
});