import { useState,useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 28,
  borderRadius: 7,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.mode === 'light' ? 'rgb(169, 234, 227)' : '',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 4,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));


export default function ProfitLoss({ userInfo }) {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [netIncome, setNetIncome] = useState(0);
  const [timeRange, setTimeRange] = useState('last_month');

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  useEffect(() => {
    const fetchProfitLoss = async () => {
      try {
        const response = await fetch(`/api/profit-loss/${userInfo.id}`, {
          params: {
            timeRange,
          },
        });
        var responses = await response.json();
        setIncomeData(responses.totalIncome);
        setExpenseData(responses.totalExpenses);
        setNetIncome(responses.netIncome);
      } catch (error) {
        console.error('Error fetching profit and loss data:', error);
      }
    };

    fetchProfitLoss();
  }, [userInfo.id, timeRange]);

  return (
    <Paper className='border-2'>
      <Stack spacing={2}>
        <div className='flex justify-between text-center align-center'>
          <div><h1 className='m-4 font-semibold text-linear-300'>Profit and Loss</h1></div>
          <div>
            <div className='mt-1 mr-4 w-40'>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Time</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={timeRange}
                  onChange={handleTimeRangeChange}
                  label="Last Month"
                >
                  <MenuItem value="last_month">Last month</MenuItem>
                  <MenuItem value="last_six_months">Last six months</MenuItem>
                  <MenuItem value="last_year">Last year</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>

        <div className='flex flex-col'>
          <div className='place-content-start grid -mt-9 ml-4 font-bold text-linear-300 text-2xl'>{netIncome}</div>
          <div className="place-content-start grid ml-4 font-semibold text-black-900_01 text-sm">Net income for the {timeRange}</div>
        </div>

      <div className='flex flex-col'>
       <div className='flex justify-between'>
       <div className='ml-3 font-extrabold text-linear-300 text-center'>{incomeData}</div>
       <div className='mr-5 text-black-900_d1' >6 to reviews</div>
       </div><div className="flex justify-between">  
        <div className='m-1 ml-3 font-semibold text-black text-center'> Income </div>
        <div className='mr-5 w-[70%] text-[#18f2eb]'><BorderLinearProgress variant="determinate" sx={{color : "white"}} value={80} />
        </div>
      </div>
      
     
      </div>
      <div className='flex flex-col'>
      <div className='flex justify-between'>
      <div className='ml-3 font-extrabold text-linear-300 text-center'>{expenseData}</div>
      <div className='mr-5 text-black-900_d1'>15 to reviews</div>
      </div><div className="flex justify-between mb-2">  
       <div className='ml-3 font-semibold text-black-900 text-center'> Expenses </div>
       <div className='mr-5 w-[70%] text-[#18f2eb]'><BorderLinearProgress variant="determinate" sx={{color : "white"}} value={60} />
       </div>
       </div>
       </div>
      </Stack>
    </Paper>
  );
}
