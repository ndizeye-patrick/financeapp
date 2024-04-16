import React, { useState } from 'react';

const FilterBar = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div className="flex justify-center mb-4">
      <div className="mr-4">
        <label htmlFor="month" className="block text-sm font-medium text-gray-700">
          Month
        </label>
        <select
          id="month"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Select Month</option>
          {/* Add your month options here */}
        </select>
      </div>
      <div>
        <label htmlFor="year" className="block text-sm font-medium text-gray-700">
          Year
        </label>
        <select
          id="year"
          value={selectedYear}
          onChange={handleYearChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Select Year</option>
          {/* Add your year options here */}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;