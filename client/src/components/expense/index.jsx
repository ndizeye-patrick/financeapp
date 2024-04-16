import {useState,useEffect}  from 'react';
import { PieChart ,  pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Paper } from '@mui/material';

export default function BasicPie({children,userInfo}) {
  const [expenseData, setExpenseData] = useState([]);

  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const response = await fetch(`/api/expenses/${userInfo.id}`);
        const {expenseData,totalExpenses} = await response.json();
        setExpenseData(expenseData);
        setTotalExpenses(totalExpenses);
      } catch (err) {
        console.error(err);
      }
    };

    fetchExpenseData();
  }, [userInfo]);
  const data = expenseData.map(item => ({
    value: item.value,
    label: item.category,
    // Add color based on category or set a default color
    color: getColorForCategory(item.category) || '#18B4F2'
  }));
  
  const size = {
    width: 400,
    height: 150,
  };
  return (
    <Paper className='ml-2'>
    <div className="flex justify-center   sm:grid border-2">
    <div className='grid content-center p-4 w-[20%]'>
      <h1 className='text-xl font-semibold text-linear-300'>Expenses</h1>
      <span className='text-lg text-black-900_01'>RWF{totalExpenses}</span>
      <span className='text-black-900'>Total expenses over  <br/> last 30 days</span>
       
    </div>
      <div className='m-5 w-60%'>
      <PieChart
      series={[
        {
          arcLabel: (item) => ``,
          arcLabelMinAngle: 45,
          data,
    
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'black',
          fontWeight: 'light',
        },
      }}
      {...size}
    />
    </div>
    <div>
    </div>
    </div>
    </Paper>
  );
}
// Helper function to get color based on category
function getColorForCategory(category) {
  // Define a mapping of categories to colors
  const colorMap = {
    Food: '#18B4F2',
    Travel: '#18F2A1',
    Equipments: '#18F2EB',
    // Add more categories and colors as needed
  };

  return colorMap[category];
}