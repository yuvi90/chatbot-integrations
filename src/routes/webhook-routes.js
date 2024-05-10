const router = require("express").Router();
const webhookController = require("../controllers/webhook");

router.get("/facebook", webhookController.subscribeWebhook);
router.post("/facebook", webhookController.respondWebhook);

module.exports = router;
