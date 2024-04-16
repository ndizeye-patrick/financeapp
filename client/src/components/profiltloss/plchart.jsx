import React from 'react';
import { TEChart } from 'tw-elements-react';

const ProfitLossChart = () => {
  const data = {
    labels: ['Profit', 'Loss'],
    datasets: [
      {
        label: 'Profit & Loss',
        data: [150000, 85000],
        backgroundColor: ['#16a34a', '#14b8a6'],
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return '$' + value.toLocaleString();
          },
        },
      },
    },
  };

  return (
    <div className="ml-[5%] w-[80%] shadow-inner">
      <TEChart type="bar" data={data} options={options} />
    </div>
  );
};

export default ProfitLossChart;