import { Add } from '@mui/icons-material';
import { Box, Button,Select,MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useState } from 'react';

const Buttons = ({children,userInfo}) => {
  const [openIncomeForm, setOpenIncomeForm] = useState(false);
  const [openExpenseForm, setOpenExpenseForm] = useState(false);
  const [amount,setAmount] = useState('');
  const [category,setCategory]= useState('');

  const handleOpenIncomeForm = () => {
    setOpenIncomeForm(true);
  };

  const handleCloseIncomeForm = () => {
    setOpenIncomeForm(false);
  };

  const handleOpenExpenseForm = () => {
    setOpenExpenseForm(true);
  };

  const handleCloseExpenseForm = () => {
    setOpenExpenseForm(false);
  };
  const addIncome = async (event) => {
    try {
      handleCloseIncomeForm();
      event.preventDefault();
      const user_id = userInfo.id;
      console.log(user_id);
      const type = "income";
      const transaction_type_name = category;
      const data = { type, transaction_type_name,user_id, amount };
      const response = await fetch("http://localhost:5000/api/transaction/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        console.log("Record successfully inserted");
        window.location.reload();
      } else {
        const message = await response.json();
        console.log(message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const addExpense = async (event) => {
    try {
      handleCloseIncomeForm();
      event.preventDefault();
      const user_id = userInfo.id;
      console.log(user_id);
      const type = "expense";
      const transaction_type_name = category;
      const data = { type, transaction_type_name,user_id, amount };
      const response = await fetch("http://localhost:5000/api/transaction/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        console.log("Record successfully inserted");
        window.location.reload();
      } else {
        const message = await response.json();
        console.log(message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box display="flex" justifyContent="center" mr={2} mt={0}>
      <Button
        variant="outlined"        
        color="primary"
        style={{background: 'linear-gradient(to right bottom, #186ff2, #812de2)'}}
        onClick={handleOpenIncomeForm}
        sx={{
            height:"50px",
            width:"75%",
            color : "black",
          '&:hover': {
            background: '#fff',
            color: '#fff',
          },
          mr: 2,
        }}
      >
      <Add/>NEW  INCOME
      </Button>
      <Button
        variant="outlined"
        color="primary"
        style={{background: 'linear-gradient(to right bottom, #186ff2, #812de2)'}}
        onClick={handleOpenExpenseForm}
        sx={{
          height:"50px",
            width:"75%",
            color : "black",
          '&:hover': {
            background: '#fff',
            color: '#fff',
          },
        }}
      >
       <Add/> NEW EXPENSE
      </Button>

      <Dialog open={openIncomeForm} onClose={handleCloseIncomeForm}>
        <DialogTitle>New Income</DialogTitle>
        <DialogContent>
          <Select
            autoFocus
            placeholder='selectt the category'
            required
            margin="dense"
            label="category of income"
            type="test"
            fullWidth
            variant="standard"
            onChange={(e)=>setCategory(e.target.value)}
          >
          <MenuItem fullWidth value="Salary">Salary</MenuItem>
          <MenuItem fullWidth value="Bonus">Bonus</MenuItem>
          </Select>
          <TextField
          autoFocus
          required
          margin="dense"
          label="Income Amount"
          type="number"
          onChange={(e)=>setAmount(e.target.value)}
          fullWidth
          variant="standard"
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{
            handleCloseIncomeForm();
            
            
          } }>Cancel</Button>
          <Button onClick={addIncome}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openExpenseForm} onClose={handleCloseExpenseForm}>
        <DialogTitle>New Expense</DialogTitle>
        <DialogContent>
        <Select
        autoFocus
        placeholder='selectt the category'
        required
        margin="dense"
        label="category of income"
        type="test"
        fullWidth
        variant="standard"
        onChange={(e)=>setCategory(e.target.value)}
      >
      <MenuItem fullWidth value="Food">Food</MenuItem>
      <MenuItem fullWidth value="Travel">Travel</MenuItem>
      </Select>
      <TextField
      autoFocus
      required
      margin="dense"
      label="Expense Amount"
      type="number"
      onChange={(e)=>setAmount(e.target.value)}
      fullWidth
      variant="standard"
      />
      </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseExpenseForm}>Cancel</Button>
          <Button onClick={addExpense}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Buttons;