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
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Currency</h5>
          </div>
          <div className="modal-body">
            <select
              className="form-select mb-3"
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
          </div>
          <div className="modal-footer">
            <button
              onClick={closeModal}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={addCurrency}
              className="btn btn-primary"
              disabled={!selected}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCurrencyModal;
