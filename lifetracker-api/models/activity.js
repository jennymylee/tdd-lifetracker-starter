const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");

class Activity {
  static async calculateDailyCaloriesSummaryStats(userId) {
    if (!userId) {
      throw new BadRequestError("userId is null");
    }
    const res = await db.query(
      `SELECT created_at::date AS "date", SUM(quantity*calories) 
      AS "totalCaloriesPerDay" FROM nutrition WHERE user_id=$1 
      GROUP BY created_at::date;`,
      [userId]
    );
    return res.rows;
  }

  static async calculatePerCategoryCaloriesSummaryStats(userId) {
    if (!userId) {
      throw new BadRequestError("userId is null");
    }
    const res = await db.query(
      `SELECT category, ROUND(AVG(quantity*calories), 1)  
        AS "avgCaloriesPerCategory" FROM nutrition WHERE user_id=$1 
        GROUP BY category LIMIT 6;`,
      [userId]
    );
    return res.rows;
  }
}
module.exports = Activity;
