const express = require("express");
const Activity = require("../models/activity");
const { BadRequestError, NotFoundError } = require("../utils/errors");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const userId = req.headers["user_id"];
    if (!userId) {
      throw new BadRequestError("'user_id' header not passed in");
    }
    const perDay = await Activity.calculateDailyCaloriesSummaryStats(userId);
    const perCategory = await Activity.calculatePerCategoryCaloriesSummaryStats(
      userId
    );
    res.status(200).json({ nutrition: { calories: { perDay, perCategory } } });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
