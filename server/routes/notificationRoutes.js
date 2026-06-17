const express = require("express");

const router = express.Router();

const Notification = require("../models/Notification");

const protect = require("../middleware/authMiddleware");

router.get("/", protect, async (req, res) => {

    const notifications = await Notification.find({})
        .sort({ createdAt: -1 })
        .limit(5);

    res.json(notifications);

});

router.get("/count", protect, async (req, res) => {

const count = await Notification.countDocuments({
    userId: req.user.id,
    read: false
});
    res.json({
        count: Math.min(count, 5)
    });

});
router.put("/read", protect, async (req, res) => {

    await Notification.updateMany(
        {
            userId: req.user.id,
            read: false
        },
        {
            read: true
        }
    );

    res.json({
        message: "Notifications marked as read"
    });

});

module.exports = router;