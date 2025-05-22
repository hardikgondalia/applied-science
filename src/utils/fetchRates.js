export const fetchRates = async (base, currencies, startDate, endDate) => {
  // Mocked response – replace with real API if needed
  const dates = getDatesInRange(startDate, endDate);
  const result = {};
  currencies.forEach(curr => {
    result[curr] = {};
    dates.forEach(date => {
      result[curr][date] = (Math.random() * (1.5 - 0.5) + 0.5).toFixed(4); // Random rate
    });
  });
  return result;
};

const getDatesInRange = (start, end) => {
  const dates = [];
  let current = new Date(start);
  const to = new Date(end);
  while (current <= to) {
    dates.push(current.toISOString().split('T')[0]);
    current.setDate(current.getDate() + 1);
  }
  return dates;
};