import React, { useState } from 'react';
import { currencyList } from '../data/currencyList';

const AddCurrencyModal = ({ currencies, setCurrencies, closeModal }) => {
  const [selected, setSelected] = useState('');

  const addCurrency = () => {
    if (selected && !currencies.includes(selected) && currencies.length < 7) {
      setCurrencies([...currencies, selected]);
      closeModal();
    }
  };

  const availableCurrencies = currencyList.filter(c => !currencies.includes(c.code));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded">
        <h2 className="text-lg mb-2">Add Currency</h2>
        <select
          className="border p-1 w-full mb-2"
          value={selected}
          onChange={e => setSelected(e.target.value)}
        >
          <option value="">Select a currency</option>
          {availableCurrencies.map(currency => (
            <option key={currency.code} value={currency.code}>
              {currency.code} - {currency.name}
            </option>
          ))}
        </select>
        <div className="flex justify-end gap-2">
          <button onClick={closeModal} className="border px-2 py-1">Cancel</button>
          <button onClick={addCurrency} className="bg-blue-500 text-white px-2 py-1 rounded">Add</button>
        </div>
      </div>
    </div>
  );
};

export default AddCurrencyModal;