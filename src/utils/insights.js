export function calculateHealth(expenses) {
  if (!expenses || expenses.length === 0) return 100;

  let score = 100;
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  // 1. Calculate category totals
  const categories = {};
  expenses.forEach((e) => {
    categories[e.category] = (categories[e.category] || 0) + e.amount;
  });

  // Rule 1: High Total Spending
  if (total > 100000) {
    score -= 40;
  } else if (total > 15000) {
    score -= 20;
  }

  // Rule 2: One category dominates (> 50% of total)
  for (let category in categories) {
    if (categories[category] / total > 0.5) {
      score -= 30;
      break;
    }
  }

  // Rule 3: Shopping addiction (> 30% on Shopping)
  if (categories["Shopping"] && categories["Shopping"] / total > 0.3) {
    score -= 20;
  }

  // Rule 4: Too many expenses (> 10 transactions)
  if (expenses.length > 10) {
    score -= 10;
  }

  return Math.max(score, 0);
}
