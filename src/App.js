import React, { useState, useEffect } from 'react';
import BaseCurrencySelector from './components/BaseCurrencySelector';
import ExchangeRateTable from './components/ExchangeRateTable';
import AddCurrencyModal from './components/AddCurrencyModal';
import { fetchRates } from './utils/fetchRates';
import { currencyList } from './data/currencyList';

const App = () => {
  const [baseCurrency, setBaseCurrency] = useState('GBP');
  const [currencies, setCurrencies] = useState(['USD', 'EUR', 'JPY']);
  const [dates, setDates] = useState(generatePastDates(7));
  const [rates, setRates] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchRates(baseCurrency, currencies, dates[0], dates[dates.length - 1])
      .then(setRates);
  }, [baseCurrency, currencies, dates]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Exchange Rate Viewer</h1>
      <BaseCurrencySelector 
        baseCurrency={baseCurrency} 
        setBaseCurrency={setBaseCurrency} 
      />
      <ExchangeRateTable 
        currencies={currencies} 
        setCurrencies={setCurrencies}
        dates={dates} 
        setDates={setDates} 
        rates={rates} 
      />
      <button onClick={() => setShowModal(true)}>Add Currency</button>
      {showModal && (
        <AddCurrencyModal 
          currencies={currencies} 
          setCurrencies={setCurrencies} 
          closeModal={() => setShowModal(false)} 
        />
      )}
    </div>
  );
};

function generatePastDates(days) {
  const today = new Date();
  return Array.from({ length: days }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (days - 1 - i));
    return d.toISOString().split('T')[0];
  });
}

export default App;