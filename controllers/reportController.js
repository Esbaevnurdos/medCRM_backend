const db = require("../db/reportQueries");

const getDailyExpenseReport = async (req, res) => {
  try {
    const report = await db.getGroupedExpensesByPeriod("day");
    res.status(200).json({ success: true, data: report });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to get daily report" });
  }
};

const getWeeklyExpenseReport = async (req, res) => {
  try {
    const report = await db.getGroupedExpensesByPeriod("week");
    res.status(200).json({ success: true, data: report });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to get weekly report" });
  }
};

const getMonthlyExpenseReport = async (req, res) => {
  try {
    const report = await db.getGroupedExpensesByPeriod("month");
    res.status(200).json({ success: true, data: report });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to get monthly report" });
  }
};

const getYearlyExpenseReport = async (req, res) => {
  try {
    const report = await db.getGroupedExpensesByPeriod("year");
    res.status(200).json({ success: true, data: report });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to get yearly report" });
  }
};

const getCustomRangeReport = async (req, res) => {
  const { start_date, end_date } = req.query;
  try {
    const report = await db.getGroupedExpensesByPeriod(
      "day",
      start_date,
      end_date
    );
    res.status(200).json({ success: true, data: report });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to get custom range report" });
  }
};

module.exports = {
  getDailyExpenseReport,
  getWeeklyExpenseReport,
  getMonthlyExpenseReport,
  getYearlyExpenseReport,
  getCustomRangeReport,
};
