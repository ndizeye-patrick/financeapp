import React, { useState, useEffect } from 'react';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';

const TransactionItem = ({ transaction, onEdit }) => (
  <div
    className="flex justify-between items-center border-gray-200 py-6 m-3 border-b h-8 cursor-pointer"
    onClick={() => onEdit(transaction)}
  >
    {transaction.type === 'income' ? (
      <ArrowUpward sx={{ color: 'green' }} />
    ) : (
      <ArrowDownward sx={{ color: 'red' }} />
    )}
    <div>
      <p className="text-gray-600">
        {transaction.type === 'income'
          ? transaction.incomeType?.income_type || 'Unknown Income Type'
          : transaction.expenseType?.expense_type || 'Unknown Expense Type'}
      </p>
      <p className="text-gray-500 text-sm">
        {transaction.createdAt instanceof Date
          ? transaction.createdAt.toLocaleDateString()
          : transaction.createdAt || 'Unknown Date'}
      </p>
    </div>
    <p
      className={`font-semibold ${
        transaction.amount > 0 ? 'text-linear-300' : 'text-[#18f2eb]'
      }`}
    >
      {transaction.amount > 0 ? '+' : '-'} RWF {Math.abs(transaction.amount)}
    </p>
  </div>
);

const TransactionDetails = ({
  editedTransaction,
  onUpdate,
  onDelete,
  onClose,
}) => {
  const [updatedTransaction, setUpdatedTransaction] = useState(editedTransaction);

  const handleUpdateTransaction = () => {
    onUpdate(updatedTransaction, editedTransaction.user_id);
  };

  const handleDeleteTransaction = () => {
    onDelete(updatedTransaction, editedTransaction.user_id);
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Transaction Details</DialogTitle>
      <DialogContent className="flex w-full">
        <TextField
          variant="outlined"
          value={updatedTransaction?.type || ''}
          disabled
        />
        <TextField
          variant="outlined"
          value={updatedTransaction?.category || ''}
          onChange={(e) =>
            setUpdatedTransaction({
              ...updatedTransaction,
              category: e.target.value,
            })
          }
        />
        <TextField
          variant="outlined"
          value={updatedTransaction?.amount || ''}
          onChange={(e) =>
            setUpdatedTransaction({
              ...updatedTransaction,
              amount: e.target.value,
            })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdateTransaction}>Update</Button>
        <Button onClick={handleDeleteTransaction}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

const RecentTransactions = ({ userInfo }) => {
  const [transactions, setTransactions] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showAllTransactionsDialog, setShowAllTransactionsDialog] = useState(false);

  const fetchTransactions = async (showAll = false) => {
    try {
      const response = await fetch(
        showAll
          ? `/api/transactionall/${userInfo.id}`
          : `/api/transactions/recent/${userInfo.id}`
      );
      const data = await response.json();
      setTransactions(data);
      setAllTransactions(data);
      setLoading(false);
      setShowAllTransactionsDialog(showAll);
    } catch (error) {
      console.error(
        `Error fetching ${showAll ? 'all' : 'recent'} transactions:`,
        error
      );
      setError(`Failed to fetch ${showAll ? 'all' : 'recent'} transactions`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [userInfo.id]);

  const handleEditTransaction = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleUpdateTransaction = async (updatedTransaction, userId) => {
    try {
      await fetch(`http://localhost:5000/api/transaction/${updatedTransaction.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...updatedTransaction, userId }),
      });
      await fetchTransactions();
      setSelectedTransaction(null);
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const handleDeleteTransaction = async (transaction, userId) => {
    try {
      await fetch(`http://localhost:5000/api/transaction/${transaction.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      await fetchTransactions();
      setSelectedTransaction(null);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleViewAll = () => {
    fetchTransactions(true);
  };

  const handleCloseAllTransactionsDialog = () => {
    setShowAllTransactionsDialog(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-white shadow-lg border-2 p-4 w-[94.5%] rounded-lg ">
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-semibold text-[#186ff2] text-xl">Recent Transactions</h2>
        <Button variant="outlined" onClick={handleViewAll}>
          View all
        </Button>
      </div>
      <div>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onEdit={handleEditTransaction}
            />
          ))
        ) : (
          <p>No transactions found.</p>
        )}
      </div>

      {selectedTransaction && (
        <TransactionDetails
          editedTransaction={selectedTransaction}
          onUpdate={handleUpdateTransaction}
          onDelete={handleDeleteTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}

      <Dialog
        className='w-full justify-between'
        open={showAllTransactionsDialog}
        onClose={handleCloseAllTransactionsDialog}
      >
        <DialogTitle>All Transactions</DialogTitle>
        <DialogContent className='w-full'>
          <div className='flex flex-col  justify-between m-5'>
            {allTransactions.length > 0 ? (
              allTransactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  style={{color:'white',}}                  
                  transaction={transaction}
                  onEdit={handleEditTransaction}
                />
              ))
            ) : (
              <p>No transactions found.</p>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAllTransactionsDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RecentTransactions;