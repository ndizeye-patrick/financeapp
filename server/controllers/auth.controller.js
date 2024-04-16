const db = require('../models/index');
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { where , Op} = require('sequelize');

dotenv.config();

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if the email exists
        const userExists = await db.User.findOne({
            where: {email}
        });
        if (userExists) {
            return res.status(400).json({message:'Email is already associated with an account'});
        }


        await db.User.create({
            name,
            email,
            password: await bcrypt.hash(password, 15),
        });
        return res.status(200).send('Registration successful');
    } catch (err) {
        return res.status(500).send('Error in registering user', err);
    }
}

const signInUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await db.User.findOne({
        where: { email }
      });
  
      if (!user) {
        return res.status(401).json({message:'Invalid username and or password'});
      }
  
      // Verify password
      const passwordValid = await bcrypt.compare(password, user.password);
  
      if (!passwordValid) {
        return res.status(401).json({message:"Invalid username and or password"});
      }
  
      // Authenticate user with jwt
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRATION // Use JWT_ACCESS_EXPIRATION
      });
      
      res.cookie('accessToken', token, {
        httpOnly: true,
        sameSite: 'strict', // or 'lax' depending on your requirements
        secure: process.env.NODE_ENV === 'production', // set to true in production
        maxAge: 60 * 60 * 1000, // in milliseconds
      });


      res.status(200).json({ id: user.id, name: user.name, email: user.email });
    } catch (err) {
      return res.status(500).json({err:err.message,});
    }
}

const companyRegister = async (req , res) => {
    try{
      const {name , email , location ,  password , employees} = req.body;

      const companyExists = await db.Company.findOne({
          where: {email}
          });
      if(companyExists){
        return res.status(400).json({message:'Email is already registered'});
      }
      await db.Company.create({
        name,
        email,
        location,
        password: await bcrypt.hash(password, 15),
        employees,
      });
      return res.status(200).json({message:'Company Registered succesfully'});
    }catch (error) {
      console.error('Error registering company:', error);
      return res.status(500).json({ message: 'Error registering company', error: error.message });
    }
}

const companyLogin = async (req,res) => {

try{
    const { email, password } = req.body;

    const user = await db.Company.findOne({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({message:'Invalid username and or password'});
    }

    // Verify password
    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(401).json({message:"Invalid username and or password"});
    }

    // Authenticate user with jwt
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRATION // Use JWT_ACCESS_EXPIRATION
    });
    
    res.cookie('accessToken', token, {
      httpOnly: true,
      sameSite: 'strict', // or 'lax' depending on your requirements
      secure: process.env.NODE_ENV === 'production', // set to true in production
      maxAge: 60 * 60 * 1000, // in milliseconds
    });


    res.status(200).json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    return res.status(500).json({err:err.message,});
  }
}

const getUserInfo = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json('Access token not found');
    }

    // Verify the access tokenJWT_ACCESS_EXPIRATION_INTER
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Fetch user information from the database
    const user = await db.User.findByPk(userId);
    if (!user) {
      return res.status(404).json('User not found');
    }

    res.status(200).json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    const Token = req.cookies
    return res.status(500).json({ err: err.message ,token: Token, pazzo : err.message});
  }
};

const companyUser = async (req , res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json('Access token not found');
    }

    // Verify the access tokenJWT_ACCESS_EXPIRATION_INTER
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Fetch user information from the database
    const user = await db.Company.findByPk(userId);
    if (!user) {
      return res.status(404).json('User not found');
    }

    res.status(200).json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    const Token = req.cookies
    return res.status(500).json({ err: err.message ,token: Token, pazzo : err.message});
  }
}

// Section for the transactions 
const createTransaction = async (req, res) => {
  try {
    const { type,user_id,amount,transaction_type_name} = req.body;

    // Validate required fields
    if (!type || !amount || !user_id || !transaction_type_name) {
      return res.status(400).json({ error: 'Type, amount, user_id, and transaction_type_name are required' });
    }

    // Check if user exists
    const user = await db.User.findByPk(user_id);
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Check if transaction type exists
    let transactionType;
    if (type === 'expense') {
      transactionType = await db.Expense_type.findOne({where: {expense_type:transaction_type_name}});
      
    } else {
      transactionType = await db.Income_type.findOne({where:{income_type:transaction_type_name}});
      
    }
    if (!transactionType) {
      return res.status(400).json({ error: 'Transaction type not found' });
    }
    const category = transaction_type_name
    
    const transaction_type_id = transactionType.id;

    const transaction = await db.Transaction.create({
      type,
      category,
      amount,
      user_id,
      transaction_type_id,
    });

    res.status(201).json({message:"Transaction created"});
  } catch (error) {
    console.error(error.message);
    res.status(500).json({message:error.message});
  }
};

// Sections for  updating a transaction 

const UpdateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, category, amount, userId } = req.body;

    // Check if the transaction exists
    const existingTransaction = await db.Transaction.findByPk(id);
    if (!existingTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    if(existingTransaction.user_id !== userId){
      return res.status(401).json({error: 'User Not allowed to edit'})
    } 

    // Update the transaction
    await db.Transaction.update(
      { type, category, amount },
      { where: { id }, returning: true, plain: true }
    );

    // Fetch the updated transaction
    const updatedTransaction = await db.Transaction.findByPk(id);

    res.json(updatedTransaction);
  } catch (error) {
    console.error('Error while updating transaction:', error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a  User Transaction 
const deleteTransaction = async (req, res) => {
  try {
    const { userId } = req.body;
    const id = req.params.id;
    // Find the transaction by ID
    const transaction = await db.Transaction.findByPk(id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    // Check if the user owns the transaction
    if (transaction.user_id !== userId ) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Delete the transaction
    await transaction.destroy();
    console.log("Transaction Deleted");
    res.status(204).json({message:"Transaction was successfully deleted "});
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
};

// Delete Company Transactions 
const deleteCTransaction = async (req,res) => { 
  try{
    const {id} = req.params
    const transaction = await db.Company .findByPk(id);
    if (!transaction) {
      console.log("transaction not fund");
    }
    // checking if transaction is being deleted by inserted company
    if(transaction.id !== req.user.id){
      console.log("Not allowed to delete this transaction")
    }
    await transaction.destroy();
    res.status(204).json({"message":"transaction succesfully deleted"});
  }
  catch(error){
    console.log("error");
    res.status(500).json({message: error.message})
  }
  
}

const getTransactionsIncomeSummary = async (req,res) => {
  try {
    const userId = req.params.id;
    const userExists = await db.User.findByPk(userId)
    if(!userExists){
      console.log("user not found")
      return  res.status(404).json({message: "user not found"})

    }
    const totalIncome = await db.Transaction.sum('amount', { where: { type: 'income' } }, {where: { id: userId}});
    const overBudget = await db.Transaction.sum('amount', { where: { type: 'expense', amount: { [db.Sequelize.Op.gt] : 200 } } });
    const paidLast30Days = await db.Transaction.sum('amount', { where: { type: 'expense', createdAt: { [db.Sequelize.Op.gte]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } } });

    // Prepare the response object
    const incomeData = {
      totalIncome,
      overBudget,
      paidLast30Days
    };

    res.json(incomeData);

  }catch(error){
    console.log(error.message);
    res.json({message: error.message})
  }
}

// getting expenses 

const getExpenses = async (req, res) => {
  try {
    // Fetch expense data from the database
    const id = req.params.id;
    const expenseData = await db.Transaction.findAll({
      where: {
        type: 'expense',
        createdAt: {
          [Op.gte]: db.sequelize.literal('CURRENT_DATE - INTERVAL \'30 days\'')
        },
        user_id: id,
      },
      attributes: [
        'category',
        [db.sequelize.fn('SUM', db.sequelize.col('amount')), 'value']
      ],
      group: ['category'],
      raw: true
    });

    const totalExpenses = await db.Transaction.sum('amount', {
      where: {
        type: 'expense',
        createdAt: {
          [Op.gte]: db.sequelize.literal('CURRENT_DATE - INTERVAL \'30 days\'')
        },
        user_id: id,
      }
    });

    res.json({ expenseData, totalExpenses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

// profitLossController.js
const getProfitLoss = async (req, res) => {
  try {
    const { userId } = req.params;
    const { timeRange } = req.query; // Get the timeRange from the query parameters

    // Calculate the start date based on the timeRange
    let startDate;
    switch (timeRange) {
      case 'last_month':
        startDate = db.sequelize.literal('CURRENT_DATE - INTERVAL \'30 days\'');
        break;
      case 'last_six_months':
        startDate = db.sequelize.literal('CURRENT_DATE - INTERVAL \'180 days\'');
        break;
      case 'last_year':
        startDate = db.sequelize.literal('CURRENT_DATE - INTERVAL \'365 days\'');
        break;
      default:
        startDate = db.sequelize.literal('CURRENT_DATE - INTERVAL \'30 days\'');
    }

    // Fetch income data
    const incomeData = await db.Transaction.findAll({
      where: {
        type: 'income',
        createdAt: {
          [Op.gte]: startDate,
        },
        user_id: userId,
      },
      attributes: [
        'category',
        [db.sequelize.fn('SUM', db.sequelize.col('amount')), 'value'],
      ],
      group: ['category'],
      raw: true,
    });

    // Fetch expense data
    const expenseData = await db.Transaction.findAll({
      where: {
        type: 'expense',
        createdAt: {
          [Op.gte]: startDate,
        },
        user_id: userId,
      },
      attributes: [
        'category',
        [db.sequelize.fn('SUM', db.sequelize.col('amount')), 'value'],
      ],
      group: ['category'],
      raw: true,
    });

    // Calculate net income
    const totalIncome = await db.Transaction.sum('amount', {
      where: {
        type: 'income',
        createdAt: {
          [Op.gte]: startDate,
        },
        user_id: userId,
      },
    });
    const totalExpenses = await db.Transaction.sum('amount', {
      where: {
        type: 'expense',
        createdAt: {
          [Op.gte]: startDate,
        },
        user_id: userId,
      },
    });
    const netIncome = totalIncome - totalExpenses;

    res.json({netIncome, totalIncome, totalExpenses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
// FinanceInsights Controlee

// financeController.js
// financeController.js
const getFinanceData = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch income data
    const incomeData = await db.Transaction.findAll({
      where: {
        type: 'income',
        createdAt: {
          [Op.gte]: db.sequelize.literal('CURRENT_DATE - INTERVAL \'180 days\''),
        },
        user_id: userId,
      },
      attributes: [
        [db.sequelize.fn('TO_CHAR', db.sequelize.col('createdAt'), 'YYYY-MM'), 'month'],
        [db.sequelize.fn('SUM', db.sequelize.col('amount')), 'value'],
      ],
      group: ['month', 'user_id', 'createdAt'], // Include createdAt in the GROUP BY clause
      order: [['createdAt', 'ASC']],
      raw: true,
    });

    // Fetch expense data
    const expenseData = await db.Transaction.findAll({
      where: {
        type: 'expense',
        createdAt: {
          [Op.gte]: db.sequelize.literal('CURRENT_DATE - INTERVAL \'180 days\''),
        },
        user_id: userId,
      },
      attributes: [
        [db.sequelize.fn('TO_CHAR', db.sequelize.col('createdAt'), 'YYYY-MM'), 'month'],
        [db.sequelize.fn('SUM', db.sequelize.col('amount')), 'value'],
      ],
      group: ['month', 'user_id', 'createdAt'], // Include createdAt in the GROUP BY clause
      order: [['createdAt', 'ASC']],
      raw: true,
    });

    // Format the data for the line chart
    const xLabels = [...new Set(incomeData.map((item) => item.month))];
    const incomeValues = xLabels.map((month) => {
      const incomeItem = incomeData.find((item) => item.month === month);
      return incomeItem ? incomeItem.value : 0;
    });
    const expenseValues = xLabels.map((month) => {
      const expenseItem = expenseData.find((item) => item.month === month);
      return expenseItem ? expenseItem.value : 0;
    });

    res.json({
      incomeData: incomeValues,
      expenseData: expenseValues,
      xLabels,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
// get recent transactions
const getRecentTransactions = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("the user id is",id)
    const data = await db.Transaction.findAll({
      where: {
        user_id: id,
        createdAt: {
          [Op.gte]: db.sequelize.literal('CURRENT_DATE - INTERVAL \'30 days\''),
        },
      },
      include: [
        {
          model: db.Expense_type,
          as: 'expenseType',
        },
        {
          model: db.Income_type,
          as: 'incomeType',
        },
      ],
      order: [['createdAt', 'DESC']],
      limit: 3,
    });
    
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
// get all the transactions 
const getAllTransactions = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await db.Transaction.findAll({
      where: {
        user_id: id,
      },
      include: [
        {
          model: db.Expense_type,
          as: 'expenseType',
        },
        {
          model: db.Income_type,
          as: 'incomeType',
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
const Logout = function(req, res){
  // Clear the access token cookie on the server-side
  res.cookie('accessToken','',{maxAge : 1});

  // Return a success response
  res.redirect('/');
};

module.exports = {
    registerUser,
    signInUser,
    companyRegister,
    companyLogin,
    getUserInfo,
    getRecentTransactions,
    Logout,
    companyUser,
    deleteTransaction,
    createTransaction,
    UpdateTransaction,
    getTransactionsIncomeSummary,
    getExpenses,
    getFinanceData,
    getProfitLoss,
    getAllTransactions
    }