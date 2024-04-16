import { Box, Typography ,Paper } from '@mui/material';
import { useState , useEffect} from 'react';



export default function Income ({children , userInfo}){
const [data,setData] = useState('')

useEffect(()=>{
  const gettingData =  async()=>{
    try{
      const id = userInfo.id;
      const getdata = await fetch(`http://localhost:5000/api/transaction/${id}`,{
        credentials: 'include'
      })
      if(getdata.ok){
        const data = await getdata.json();
        setData(data);
      }
      else{
        const data = await getdata.json();
        console.log(data);
      }

    }
    catch(error){
      console.log(error.message)
    }
  }
  gettingData()
},[userInfo])

const {totalIncome,overBudget,paidLast30Days} = data;

return (
  <Paper elevation={5} sx={{ display: 'flex', marginLeft: 1 ,justifyContent: 'space-between', alignItems: 'center', p: 0 ,width : "100%" }}>
  <Box borderRadius="4px 0 0 4px" color="black" px={2} py={1} flex={1} className='bg-linear-200' >
    <Typography variant="body1">Total income</Typography>
    <Typography variant="h6" fontWeight="bold">
      RWF{totalIncome}
    </Typography>
  </Box>

  <Box className="bg-[#00ffa8]"  color="black" borderRadius="0 0px 0px 0" px={2} py={1} flex={1}>
    <Typography variant="body1">Paid last 30 days</Typography>
    <Typography variant="h6" fontWeight="bold">
      RWF{paidLast30Days}
    </Typography>
  </Box>
  <Box  color="#000" className="bg-linear-300"  px={2} py={1} flex={1}>
    <Typography variant="body1">Over budget</Typography>
    <Typography variant="h6" fontWeight="bold">
      RWF{overBudget}
    </Typography>
  </Box>
 </Paper>

)}