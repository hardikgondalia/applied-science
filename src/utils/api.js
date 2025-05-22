export const fetchCurrencyList = async () => {
  const response = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json');
  if (!response.ok) throw new Error('Failed to fetch currency list');
  return response.json();
};

export const fetchExchangeRates = async (date, baseCurrency) => {
  const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@1/${date}/currencies/${baseCurrency.toLowerCase()}.json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch exchange rates');
  return response.json();
};