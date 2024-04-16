const express = require('express');
const { registerUser, UpdateTransaction,signInUser,companyUser,Logout,getUserInfo, companyRegister , companyLogin
    ,createTransaction,
    deleteTransaction,
    getRecentTransactions,
    getProfitLoss,
    getTransactionsIncomeSummary,
    getExpenses,
    getFinanceData,
    getAllTransactions,
} = require('../controllers/auth.controller');
const router = express.Router();

// Registration route
router.post('/sign-up', registerUser);


// Signin route
router.post('/sign-in', signInUser);

// Get company information

router.get('/companyUser', companyUser)

// Company registration route
router.post('/company', companyRegister)


// Company sign-in route
router.get('/logout', Logout)

router.post('/company-signin', companyLogin)

// 
router.get('/user', getUserInfo)

// creating a transaction 

router.post('/transaction', createTransaction);

router.delete('/transaction/:id',deleteTransaction);

router.put('/transaction/:id',UpdateTransaction)

router.get('/transaction/:id', getTransactionsIncomeSummary)

router.get('/expenses/:id',getExpenses)

router.get('/profit-loss/:userId', getProfitLoss);

router.get('/finance/:userId', getFinanceData);

router.get('/transactions/recent/:id', getRecentTransactions);
// this if for all the user transactions
router.get('/transactionall/:id', getAllTransactions)

module.exports = router;
