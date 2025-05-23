import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchExchangeRates }  from '../utils/api';


const ExchangeRateTable = ({ currencies, setCurrencies, dates, setDates, rates,currencyList }) => {
  const removeCurrency = (currency) => {
    if (currencies.length > 3) {
      setCurrencies(currencies.filter(c => c !== currency));
    }
  };

  const removeDate = (date) => {
    if (dates.length > 1) {
      setDates(dates.filter(d => d !== date));
    }
  };

  const changeCurrency = (index, newCurrency) => {
    const newCurrencies = [...currencies];
    newCurrencies[index] = newCurrency;
    setCurrencies(newCurrencies);
  };

  const changeDate = (index, newDate) => {
    const formatted = newDate.toISOString().split('T')[0];
    const newDates = [...dates];
    newDates[index] = formatted;
    setDates(newDates);
  };

  const addDate = () => {
  const today = new Date();
  const formatted = today.toISOString().split('T')[0];
  // Rule 1: Check if today’s date is already added
  const dateExists = dates.includes(formatted);
  // Rule 2: Check if there's already a null date
  const hasNull = dates.includes(null);
  // If neither exists, allow adding a blank (null) date
  if (dateExists && !hasNull) {
    setDates([...dates, null]);
  }
  // If today doesn't exist and null is already present, add today's date instead
  else if (!dateExists && hasNull) {
    setDates([...dates.filter((d) => d !== null), formatted]);
  }
};

  useEffect(() => {
  const loadRates = async () => {
    try {
      const ratesData = await fetchExchangeRates('2024-05-15', 'GBP');
      console.log(ratesData);
      // → ratesData.gbp = { usd: 1.25, eur: 1.14, ... }
    } catch (err) {
      console.error('Error fetching exchange rates', err);
    }
  };

  loadRates();
}, []);

  return (
    <div className="d-flex justify-content-center flex-column  mx-5">
      <div className="d-flex justify-content-center">
        <div className="table-responsive-wrapper rounded mb-4">
          <table className="table-auto exchange-table border border-collapse mb-4 table table-light table-striped table-borderless">
            <thead>
              <tr> 
                <th className="text-light sticky-col left-col border p-2" style={{ backgroundColor: '#565145' }}>Currency</th>
                {dates.map((date, idx) => (
                  <th key={idx} className="text-light date-col border p-2" style={{ backgroundColor: '#565145' }}>{date}</th>
                ))}

                <th className="sticky-col text-light right-col border text-center p-2" style={{ backgroundColor: '#565145' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currencies.map((currency, rowIdx) => (
                <tr key={rowIdx}>
                  <td className="sticky-col left-col border px-2 py-1">
                    <select value={currency} onChange={(e) => changeCurrency(rowIdx, e.target.value)} className="border-0 w-100 p-1">
                      {currencyList.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.code}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Scrollable rate columns */}
                  {dates.map((date, colIdx) => (
                    <td key={colIdx} className="date-col border px-2 py-1">
                      {rates?.[currency]?.[date] ?? "-"}
                    </td>
                  ))}

                  <td className="sticky-col right-col border px-2 py-1">
                    <button
                      onClick={() => removeCurrency(currency)}
                      className="text-danger border-1 border-danger rounded-2 bg-transparent p-2 w-100 d-block"
                    >
                     <img src={"/assets/images/delete-svg.svg"} />
                  
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="d-flex w-100 mx-auto justify-content-end">
        <button onClick={addDate} className="bg-green-500 text-dark px-4 py-1 rounded ">
          Add Date
        </button>
      </div>
    </div>
  );
};

export default ExchangeRateTable;
