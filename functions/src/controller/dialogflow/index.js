const handler = (req, res) => {
    console.log({ headers: req.headers, body: req.body });
    res.json({
        fulfillmentText: `response : ${req.body.queryResult.queryText}`
    });
};

module.exports = { handler: handler }