import React from 'react';

const BaseCurrencySelector = ({ baseCurrency, setBaseCurrency, currencyList }) => {
  return (
    <div className="mb-4">
      <label className="mr-2">Base Currency:</label>
      <select>
        {currencyList.map((c) => (
          <option key={c.code} value={c.code}>
            {c.code} - {c.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BaseCurrencySelector;