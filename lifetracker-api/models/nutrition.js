const db = require("db");

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
  }

  static async fetchNutritionById(nutritionId) {
    //When supplied with a valid id, fetches the a nutrition
    // instance from the database that matches that id.
    //
    //If no nutrition instance matches that id, throws a
    // NotFoundError (404 status code)
  }

  static async listNutritionForUser(userId) {
    // Should list all nutrition instances in the database that
    //are owned by a particular user
  }
}

module.exports = Nutrition;
