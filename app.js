const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

const projectsRouter = require('./routes/projects');

app.use(express.json());
app.use('/api/projects', projectsRouter);

module.exports = app;
