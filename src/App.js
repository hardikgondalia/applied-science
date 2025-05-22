import React, { useEffect, useState } from 'react';
import { fetchCurrencyList } from './utils/api';
import BaseCurrencySelector from './components/BaseCurrencySelector';
import ExchangeRateTable from './components/ExchangeRateTable';
import AddCurrencyModal from './components/AddCurrencyModal';

const App = () => {
  const [currencyList, setCurrencyList] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState('GBP');
  const [currencies, setCurrencies] = useState(['USD', 'EUR', 'JPY', 'CHF', 'CAD', 'AUD', 'ZAR']);
  const [dates, setDates] = useState([new Date().toISOString().split('T')[0]]);
  const [rates, setRates] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

useEffect(() => {
  fetchCurrencyList()
    .then(data => {
      const formatted = Object.entries(data).map(([code, name]) => ({
        code: code.toUpperCase(), // optional: uppercase like "AED"
        name,
      }));
      setCurrencyList(formatted);
      console.log('formatted',formatted)
    })
    .catch(err => console.error('Error fetching currency list:', err));
}, []);

  return (
    <div className="p-4">
      {currencyList.length > 0 ? (
        <>
          <BaseCurrencySelector
            baseCurrency={baseCurrency}
            setBaseCurrency={setBaseCurrency}
            currencyList={currencyList}
          />
          <ExchangeRateTable
            currencies={currencies}
            setCurrencies={setCurrencies}
            dates={dates}
            setDates={setDates}
            rates={rates}
            currencyList={currencyList}
          />
          <button onClick={() => setModalOpen(true)}>Add Currency</button>
          <AddCurrencyModal
            open={modalOpen}
            setOpen={setModalOpen}
            availableCurrencies={currencyList}
            selectedCurrencies={currencies}
            setSelectedCurrencies={setCurrencies}
          />
        </>
      ) : (
        <p>Loading currencies...</p>
      )}
    </div>
  );
};

export default App;