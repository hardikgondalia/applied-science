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
        <h3 className='heading d-flex justify-content-center w-100 m-0 py-4 fw-bolder'>Exchange Rate Viewer</h3>
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
             <div className='d-flex w-75 mx-auto justify-content-start ms-5'>
          <button onClick={() => setModalOpen(true)} className=' bg-green-500 text-dark px-4 py-1 rounded add-currency-button'>Add Currency</button>
          </div>
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