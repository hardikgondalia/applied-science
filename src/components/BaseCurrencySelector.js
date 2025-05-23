import React from 'react';

const BaseCurrencySelector = ({ baseCurrency, setBaseCurrency, currencyList }) => {
  return (
    <div className="mb-4 d-flex justify-content-center">
      <label className="me-3 d-inline fs-5 fw-normal align-items-center">Base Currency:</label>
      <select
        className="currency-select bordered rounded p-2"
        value={baseCurrency} // controlled value
        onChange={(e) => setBaseCurrency(e.target.value)} // update parent state
      >
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