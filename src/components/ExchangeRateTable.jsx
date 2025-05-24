import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchExchangeRates } from '../utils/api';
import DeleteImage from '../../public/assets/images/delete.png';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const ExchangeRateTable = ({ currencies, setCurrencies, dates, baseCurrency }) => {
  const [rates, setRates] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currencyToDelete, setCurrencyToDelete] = useState(null);
  const removeCurrency = (currency) => {
    if (currencies.length > 3) {
      setCurrencyToDelete(currency);
      setShowModal(true);
    }
  };

  const changeCurrency = (index, newCurrency) => {
    const newCurrencies = [...currencies];
    newCurrencies[index] = newCurrency;
    setCurrencies(newCurrencies);
  };

  const handleConfirmDelete = () => {
    setCurrencies(currencies.filter(c => c !== currencyToDelete));
    setShowModal(false);
    setCurrencyToDelete(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrencyToDelete(null);
  };
  useEffect(() => {
    const loadRates = async () => {
      try {
        const allRates = {};

        for (const date of dates) {
          const ratesData = await fetchExchangeRates(date, baseCurrency.toLowerCase());
          const currencyRates = ratesData[baseCurrency.toLowerCase()];
          allRates[date] = currencyRates;
        }

        setRates(allRates);
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
          <table className="table-auto exchange-table border border-collapse mb-5 table table-light table-striped table-borderless">
            <thead>
              <tr>
                <th className="text-light sticky-col left-col border p-2 text-center">Currency</th>
                {dates.map((date, idx) => (
                  <th key={idx} className="text-light date-col border p-2 text-center">
                    {date}
                  </th>
                ))}

                <th className="sticky-col text-light right-col border text-center p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currencies.map((currency, rowIdx) => (
                <tr key={rowIdx}>
                  <td className="sticky-col left-col border px-2 py-1 text-center">
                    {currency}
                  </td>

                  {dates.map((date, colIdx) => (
                    <td key={colIdx} className="date-col border px-2 py-1 text-center">
                      {rates[date]?.[currency.toLowerCase()] !== undefined ? rates[date][currency.toLowerCase()].toFixed(2) : "-"}
                    </td>
                  ))}

                  <td className="sticky-col right-col border px-2 py-1 text-center">
                    <button
                      onClick={() => removeCurrency(currency)}
                      className="text-danger border-1 border-danger rounded-2 bg-transparent p-2 w-100 d-block"
                    >
                      <img src={DeleteImage} alt="Delete" width={24} height={24} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <DeleteConfirmationModal
        show={showModal}
        onHide={handleCloseModal}
        onConfirm={handleConfirmDelete}
        currencyName={currencyToDelete}
      />
    </div>
  );
};

export default ExchangeRateTable;

