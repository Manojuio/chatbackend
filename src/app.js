
const express = require('express');
const app = express();
const conversationRoute = require('./routes/conversation.route');
const messageRoute = require('./routes/message.route');
const logger = require('./middleware/logger.middleware');


app.use(express.json());
app.use(logger);
app.use("/conversation",conversationRoute);
app.use("/messages",messageRoute);




module.exports = app;