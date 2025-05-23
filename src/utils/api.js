export const fetchCurrencyList = async () => {
  const response = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json');
  if (!response.ok) throw new Error('Failed to fetch currency list');
  return response.json();
};

export const fetchExchangeRates = async (date, baseCurrency) => {
  const storageKey = 'exchange_rates_array';

  // Get current cache (as array)
  const cachedRaw = localStorage.getItem(storageKey);
  const cached = cachedRaw ? JSON.parse(cachedRaw) : [];

  // Try to find the entry for the date
  const existingEntry = cached.find(entry => entry.date === date);

  // If entry for date and currency exists, return it
  if (existingEntry && existingEntry[baseCurrency.toLowerCase()]) {
    return {
      date,
      [baseCurrency.toLowerCase()]: existingEntry[baseCurrency.toLowerCase()]
    };
  }

  // Fetch from API
  const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${baseCurrency.toLowerCase()}.json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch exchange rates');

  const data = await response.json(); // contains { date: "...", [baseCurrency]: { ... } }

  // Update localStorage
  if (existingEntry) {
    // Add new currency to existing date object
    existingEntry[baseCurrency.toLowerCase()] = data[baseCurrency.toLowerCase()];
  } else {
    // Create a new entry for the date
    cached.push({
      date: data.date,
      [baseCurrency.toLowerCase()]: data[baseCurrency.toLowerCase()]
    });
  }

  localStorage.setItem(storageKey, JSON.stringify(cached));

  return data;
};