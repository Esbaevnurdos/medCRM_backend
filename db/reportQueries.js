const db = require("../index");
const crypto = require("crypto");

const getGroupedExpensesByPeriod = async (
  period,
  startDate = null,
  endDate = null
) => {
  let dateTrunc = "day";
  if (period === "week") dateTrunc = "week";
  if (period === "month") dateTrunc = "month";
  if (period === "year") dateTrunc = "year";

  const query = `
    SELECT 
      date_trunc($1, created_at) AS created_at,
      SUM(amount) AS total_expenses,
      JSON_OBJECT_AGG(category, amount_sum) AS categories_summary
    FROM (
      SELECT 
        date_trunc($1, created_at) AS date,
        category,
        SUM(amount) AS amount_sum
      FROM expenses
      WHERE ($2::timestamp IS NULL OR created_at >= $2)
        AND ($3::timestamp IS NULL OR created_at <= $3)
      GROUP BY category, date
    ) sub
    GROUP BY created_at
    ORDER BY created_at DESC;
  `;

  const result = await db.query(query, [dateTrunc, startDate, endDate]);

  return result.rows.map((row) => ({
    id: crypto.randomUUID(),
    created_at: row.created_at,
    totalExpenses: row.total_expenses,
    categoriesSummary: row.categories_summary,
  }));
};

module.exports = { getGroupedExpensesByPeriod };
