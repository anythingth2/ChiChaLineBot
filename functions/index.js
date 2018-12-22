const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const line = require('@line/bot-sdk');
const config = require('./config');

const lineClient = new line.Client({
    channelSecret: config.lineChannelSecret,
    channelAccessToken: config.lineChannelAccessToken
});
const app = express();
app.use(cors({
    origin: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', line.middleware({
    channelSecret: config.lineChannelSecret,
    channelAccessToken: config.lineChannelAccessToken
}), (req, res) => {
    const events = req.body.events;
    // console.log(events);
    Promise.all(events.map((event) => {
        console.log(event);
        return lineClient.replyMessage(event.replyToken, event.message);
    })).then(() => {
        res.json({});
    });

});


exports.helloWorld = functions.https.onRequest(app);