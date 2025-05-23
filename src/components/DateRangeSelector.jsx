import React, { useState, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { addDays, format } from 'date-fns';

const DateRangeSelector = ({ setDates }) => {
  const [range, setRange] = useState([
    {
      startDate: addDays(new Date(), -6), // Last 7 days including today
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  useEffect(() => {
    const { startDate, endDate } = range[0];
    const dayList = [];
    let current = new Date(startDate);
    while (current <= endDate) {
      dayList.push(format(current, 'yyyy-MM-dd'));
      current.setDate(current.getDate() + 1);
    }
    setDates(dayList);
  }, [range, setDates]);

  return (
    <div className="ms-5 date-range-select">
      <DateRange
        editableDateInputs={true}
        onChange={item => setRange([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={range}
        direction="vertical"
        scroll={{ enabled: true }}
        maxDate={new Date()}
        minDate={addDays(new Date(), -90)}
      />
    </div>
  );
};

export default DateRangeSelector;
