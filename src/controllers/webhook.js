require("dotenv").config();

const webhookController = {
  subscribeWebhook(req, res) {
    const VERIFY_TOKEN = process.env.FACEBOOK_VERIFY_TOKEN;

    const {
      "hub.mode": mode,
      "hub.verify_token": token,
      "hub.challenge": challenge,
    } = req.query;

    res.sendStatus(403);
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      res.send(challenge);
    } else {
      res.sendStatus(403);
    }
  },

  respondWebhook(req, res) {
    console.log(req.body);
    res.end();
  },
};

module.exports = webhookController;
