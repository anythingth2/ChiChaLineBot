const line = require('@line/bot-sdk');
const config = require('../../../config');

console.log(config)

const middleware = line.middleware({
    channelSecret: config.lineChannelSecret,
    channelAccessToken: config.lineChannelAccessToken
});
const handleMessage = (event) => {

    return lineClient.replyMessage(event.replyToken, event.message);
}
const handleBeacon = (event) => {
    return lineClient.replyMessage(event.replyToken, { type: 'text', text: `สวัสดี ฉันคือ ${event.beacon.hwid} คุณ ${event.beacon.type}` })
}

const handleLineEvent = (req, res) => {
    const events = req.body.events;
    // console.log(events);
    Promise.all(events.map((event) => {
        console.log(event);
        if (event.type == 'beacon')
            return handleBeacon(event);
        else if (event.type == 'message')
            return handleMessage(event);
    })).then(() => {
        res.status(200).json({});
    });
};

module.exports = {
    middleware: middleware,
    handleLineEvent: handleLineEvent
};