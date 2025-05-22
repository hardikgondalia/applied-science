import React, { useState } from 'react';

const AddCurrencyModal = ({
  open,
  setOpen,
  availableCurrencies,
  selectedCurrencies,
  setSelectedCurrencies
}) => {
  const [selected, setSelected] = useState('');

  if (!open) return null;

  const addCurrency = () => {
    if (selected && !selectedCurrencies.includes(selected) && selectedCurrencies.length < 7) {
      setSelectedCurrencies([...selectedCurrencies, selected]);
      setSelected('');
      setOpen(false);
    }
  };

  const closeModal = () => {
    setSelected('');
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg w-80">
        <h2 className="text-lg mb-3 font-semibold">Add Currency</h2>
        <select
          className="border p-2 w-full mb-3"
          value={selected}
          onChange={e => setSelected(e.target.value)}
        >
          <option value="">Select a currency</option>
          {availableCurrencies
            .filter(c => !selectedCurrencies.includes(c.code))
            .map(currency => (
              <option key={currency.code} value={currency.code}>
                {currency.code} - {currency.name}
              </option>
          ))}
        </select>
        <div className="flex justify-end gap-2">
          <button
            onClick={closeModal}
            className="border px-3 py-1 rounded text-sm"
          >
            Cancel
          </button>
          <button
            onClick={addCurrency}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
            disabled={!selected}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCurrencyModal;
