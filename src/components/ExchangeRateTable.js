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
    // if (!dates.includes(formatted)) {
      setDates([...dates, formatted]);
    // }
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
    <div className='d-flex justify-content-center flex-column  mx-5'>
      <div  className='d-flex justify-content-center'>
      <table className="table-auto border border-collapse w-75 mb-4">
        <thead>
          <tr>
            <th className="border px-2 py-1">Currency</th>
            {dates.map((date, idx) => (
              <th key={idx} className="border px-2 py-1">
                <div className='d-flex align-items-center justify-content-between'>
                <DatePicker 
                  selected={new Date(date)}
                  onChange={(d) => changeDate(idx, d)}
                  maxDate={new Date()}
                  minDate={new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)}
                  dateFormat="yyyy-MM-dd"
                  className="border-0 p-2 fw-normal "
                />
                <button onClick={() => removeDate(date)} className="ms-3 p-0 d- flex fs-6 bg-transparent rounded-pill border-0">✖</button>
                </div>
              </th>
            ))}
            <th className="border text-center px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map((currency, rowIdx) => (
            <tr key={rowIdx}>
              <td className="border px-2 py-1">
                <select
                  value={currency}
                  onChange={e => changeCurrency(rowIdx, e.target.value)}
                  className="border-0 w-100 p-1"
                >
                  {currencyList.map(c => (
                    <option key={c.code} value={c.code}>{c.code}</option>
                  ))}
                </select>
              </td>
              {dates.map((date, colIdx) => (
                <td key={colIdx} className="border px-2 py-1">
                  {rates?.[currency]?.[date] ?? '-'}
                </td>
              ))}
              <td className="border px-2 py-1">
                <button onClick={() => removeCurrency(currency)} className="text-danger border-1 border-danger rounded-2 bg-transparent p-2 w-100 d-block">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className='d-flex w-75 mx-auto justify-content-end'>
      <button
        onClick={addDate}
        className="bg-green-500 text-dark px-4 py-1 rounded "
      >
        Add Date
      </button>
      </div>
    </div>
  );
};

export default ExchangeRateTable;
