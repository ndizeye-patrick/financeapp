import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Paper } from '@mui/material';
import axios from 'axios';

export default function BasicLineChart({ userInfo }) {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [xLabels, setXLabels] = useState([]);

  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        const response = await axios.get(`/api/finance/${userInfo.id}`);
        const { incomeData, expenseData, xLabels } = response.data;
        setIncomeData(incomeData);
        setExpenseData(expenseData);
        setXLabels(xLabels);
      } catch (error) {
        console.error('Error fetching finance data:', error);
      }
    };

    fetchFinanceData();
  }, [userInfo.id]);

  return (
    <div className="h-20">
      <Paper className='border-2 ml-8 w-full'>
        <span className="text-xl ml-2 mt-5 text-[#186ff2] font-bold">My finance insights</span>
        <LineChart
          width={500}
          height={280}
          marginLeft
          series={[
            {
              data: incomeData,
              label: 'Income',
              color: '#3DB2FF',
              pointBackgroundColor: '#3DB2FF',
            },
            {
              data: expenseData,
              label: 'Expenses',
              color: '#FF6B6B',
              pointBackgroundColor: '#FF6B6B',
            },
          ]}
          xAxis={[{ scaleType: 'band', data: xLabels }]}
          yDomain={[0, 'auto']}
          type="line"
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 50,
                },
              },
              x: {
                grid: {
                  display: false,
                },
              },
            },
            plugins: {
              title: {
                display: true,
                text: 'My finance insights',
                font: {
                  size: 18,
                },
              },
              legend: {
                position: 'top',
                labels: {
                  font: {
                    size: 14,
                  },
                },
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    let label = context.dataset.label || '';

                    if (label) {
                      label += ': ';
                    }
                    if (context.parsed.y !== null) {
                      label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                    }
                    return label;
                  },
                },
              },
            },
          }}
        />
      </Paper>
    </div>
  );
}