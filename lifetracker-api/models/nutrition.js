const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");

class Nutrition {
  static async createNutrition(nutrition) {
    //Should insert a new nutrition instance into the database
    //when values are supplied for all of the required fields:
    // "name", "category", "calories", and "image_url". The
    // quantity field should default to 1.
    //
    //The new nutrition instance should have its user_id
    //field set to the id of the authenticated user
    //
    //Should throw a BadRequestError (400 status code) or
    // UnprocessableEntityError (422 status code) when any of those
    // values are not supplied.
    if (!nutrition) {
      throw new BadRequestError("nutrition is null");
    }
    const requiredFields = [
      "name",
      "category",
      "calories",
      "image_url",
      "user_id",
    ];
    requiredFields.forEach((property) => {
      if (!nutrition.hasOwnProperty(property)) {
        throw new BadRequestError(`Missing ${property} in request body.`);
      }
    });

    const res = await db.query(
      `
    INSERT INTO nutrition 
    (name, category, calories, quantity, image_url, user_id)
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING id, name, category, calories, quantity, image_url, user_id;`,
      [
        nutrition.name,
        nutrition.category,
        nutrition.calories,
        nutrition.quantity || 1,
        nutrition.image_url,
        nutrition.user_id,
      ]
    );
    return res.rows;
  }

  static async fetchNutritionById(nutritionId) {
    //When supplied with a valid id, fetches the a nutrition
    // instance from the database that matches that id.
    //
    //If no nutrition instance matches that id, throws a
    // NotFoundError (404 status code)
    if (!nutritionId) {
      throw new BadRequestError("nutritionId is null");
    }
    const res = await db.query(`SELECT * FROM nutrition WHERE id=$1;`, [
      nutritionId,
    ]);
    return res.rows[0];
  }

  static async listNutritionForUser(userId) {
    // Should list all nutrition instances in the database that
    //are owned by a particular user
    if (!userId) {
      throw new BadRequestError("userId is null");
    }
    const res = await db.query(`SELECT * FROM nutrition WHERE user_id=$1;`, [
      userId,
    ]);
    return res.rows;
  }
}

module.exports = Nutrition;
