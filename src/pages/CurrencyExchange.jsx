import React, { useState, useMemo } from 'react';
import { fetchCurrencyList } from '../utils/api';
import BaseCurrencySelector from '../components/BaseCurrencySelector';
import ExchangeRateTable from '../components/ExchangeRateTable';
import AddCurrencyModal from '../components/AddCurrencyModal';
import DateRangeSelector from '../components/DateRangeSelector'

const CurrencyExchange = () => {
  const [currencyList, setCurrencyList] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState('GBP');
  const [currencies, setCurrencies] = useState(['USD', 'EUR', 'JPY', 'CHF', 'CAD', 'AUD', 'ZAR']);
  const [dates, setDates] = useState([new Date().toISOString().split('T')[0]]);
  const [modalOpen, setModalOpen] = useState(false);
  const todayStr = new Date().toISOString().split('T')[0];
  const [message, setErrorMessage] = useState("Maximum 7 currencies are allowed");

  const addCurrency = () => {
    if (currencies.length > 6) {
      setErrorMessage("Maximum 7 currencies are allowed");
    } else {
      setModalOpen(true);
    }
  }

  // Create reorderedDates to pass to ExchangeRateTable
  const reorderedDates = React.useMemo(() => {
    // Remove today from dates if exists
    const filteredDates = dates.filter(date => date !== todayStr);
    // Sort filteredDates descending
    filteredDates.sort((a, b) => (a < b ? 1 : -1));
    // Return [today, ...rest descending]
    return [todayStr, ...filteredDates];
  }, [dates, todayStr]);

  const fetchCurrency = () => {
    fetchCurrencyList()
      .then((data) => {
        const formatted = Object.entries(data).map(([code, name]) => ({
          code: code.toUpperCase(),
          name,
        }));
        setCurrencyList(formatted);
      })
      .catch((err) => console.error("Error fetching currency list:", err));
  };

  useMemo(() => {
    fetchCurrency();
  }, []);

  return (
    <div className="p-2 pb-0 currency-block">
      {currencyList.length > 0 ? (
        <>
          <h3 className="heading d-flex justify-content-center w-100">Exchange Rate Viewer</h3>
          <div className="d-flex align-items-stretch justify-content-center mb-2">
            <div className='py-4 d-flex flex-column justify-content-between'>
              <BaseCurrencySelector baseCurrency={baseCurrency} setBaseCurrency={setBaseCurrency} currencyList={currencyList} />
              <div className="d-flex w-100 justify-content-start">
                <button onClick={() => addCurrency()} className="bg-green-500 px-4 py-1 rounded" disabled={currencies.length > 6}>
                  Add Currency
                </button>
                {currencies.length > 6 && (<div style={{ 'color': 'red', paddingLeft: '10px', display: 'flex', alignItems: 'center', }}>{message}</div>)}
              </div>
            </div>
            <DateRangeSelector setDates={setDates} />
          </div>
          <ExchangeRateTable
            currencies={currencies}
            setCurrencies={setCurrencies}
            dates={reorderedDates}
            setDates={setDates}
            baseCurrency={baseCurrency}
            currencyList={currencyList}
          />
          <AddCurrencyModal
            open={modalOpen}
            setOpen={setModalOpen}
            availableCurrencies={currencyList}
            selectedCurrencies={currencies}
            setSelectedCurrencies={setCurrencies}
          />
          <div className='footer d-flex justify-content-center px-3'>
            <p className='p-0 m-0 text-light'>Developed by: Hardik Gondalia</p>
          </div>
        </>
      ) : (
        <p>Loading currencies...</p>
      )}
    </div>
  );
}
export default CurrencyExchange;