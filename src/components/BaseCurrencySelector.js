import React from 'react';
import { currencyList } from '../data/currencyList';

const BaseCurrencySelector = ({ baseCurrency, setBaseCurrency }) => {
  return (
    <div className="mb-4">
      <label className="mr-2">Base Currency:</label>
      <select
        value={baseCurrency}
        onChange={e => setBaseCurrency(e.target.value)}
        className="border p-1"
      >
        {currencyList.map(currency => (
          <option key={currency.code} value={currency.code}>
            {currency.code} - {currency.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BaseCurrencySelector;