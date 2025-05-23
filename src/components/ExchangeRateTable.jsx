import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchExchangeRates } from '../utils/api';

const ExchangeRateTable = ({ currencies, setCurrencies, dates, setDates, baseCurrency, currencyList }) => {
  const [rates, setRates] = useState({}); // Holds exchange rate data

  const removeCurrency = (currency) => {
    if (currencies.length > 3) {
      setCurrencies(currencies.filter(c => c !== currency));
    }
  };

  const changeCurrency = (index, newCurrency) => {
    const newCurrencies = [...currencies];
    newCurrencies[index] = newCurrency;
    setCurrencies(newCurrencies);
  };

  useEffect(() => {
  const loadRates = async () => {
    try {
      const allRates = {}; // clear old rates

      for (const date of dates) {
        const ratesData = await fetchExchangeRates(date, baseCurrency.toLowerCase());
        const currencyRates = ratesData[baseCurrency.toLowerCase()];
        allRates[date] = currencyRates;
      }

      setRates(allRates); // update rates
    } catch (err) {
      console.error('Error fetching exchange rates', err);
    }
  };

  if (dates.length > 0 && baseCurrency) {
    loadRates();
  }
}, [dates, baseCurrency]);

useEffect(() => {
  setRates({});
}, [baseCurrency]);

  return (
    <div className="d-flex justify-content-center flex-column mx-5">
      <div className="d-flex justify-content-center">
        <div className="table-responsive-wrapper rounded mb-4">
          <table className="table-auto exchange-table border border-collapse mb-4 table table-light table-striped table-borderless">
            <thead>
              <tr>
                <th className="text-light sticky-col left-col border p-2">Currency</th>
                {dates.map((date, idx) => (
                  <th key={idx} className="text-light date-col border p-2">
                    {date}
                  </th>
                ))}

                <th className="sticky-col text-light right-col border text-center p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currencies.map((currency, rowIdx) => (
                <tr key={rowIdx}>
                  <td className="sticky-col left-col border px-2 py-1">
                    {" "}
                    {currency}
                    {/* 
                    code to get select in rows
                    <select value={currency} onChange={(e) => changeCurrency(rowIdx, e.target.value)} className="border-0 w-100 p-1">
                      {currencyList.map((c) => (
                        <option key={c.code} value={c.code}>{c.code}</option>
                      ))}
                    </select> */}
                  </td>

                  {dates.map((date, colIdx) => (
                    <td key={colIdx} className="date-col border px-2 py-1">
                      {rates[date]?.[currency.toLowerCase()] !== undefined ? rates[date][currency.toLowerCase()].toFixed(2) : "-"}
                    </td>
                  ))}

                  <td className="sticky-col right-col border px-2 py-1">
                    <button
                      onClick={() => removeCurrency(currency)}
                      className="text-danger border-1 border-danger rounded-2 bg-transparent p-2 w-100 d-block"
                    >
                      <img src={"../public/assets/images/delete-svg.svg"} alt="Delete" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRateTable;

