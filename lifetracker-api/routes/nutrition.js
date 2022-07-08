const express = require("express");
const Nutrition = require("../models/nutrition");
const { BadRequestError, NotFoundError } = require("../utils/errors");
const router = express.Router();

//  will work on nutrition after. still missing
//  GET /nutrition/:nutritionId endpoint

router.post("/", async (req, res, next) => {
  try {
    const nutrition = await Nutrition.createNutrition(req.body);
    return res.status(200).json({ nutrition });
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const userId = req.headers["user_id"];
    if (!userId) {
      throw new BadRequestError("'user_id' header not passed in");
    }
    const nutritions = await Nutrition.listNutritionForUser(userId);
    return res.status(201).json({ nutritions });
  } catch (err) {
    next(err);
  }
});

router.get("/:nutritionId", async (req, res, next) => {
  try {
    //  It should send a JSON response back to the client
    // with the nutrition instance that matches the :nutritionId
    // parameter like so: { "nutrition": { ... } }
    const nutritionId = req.params.nutritionId;
    const nutrition = await Nutrition.fetchNutritionById(nutritionId);
    if (!nutrition) {
      throw new NotFoundError("Invalid nutrition id");
    }
    return res.status(200).json({ nutrition });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
