import React, { useState } from 'react';

import Card from '../UI/Card';
// import ExpensesFilter from './ExpensesFilter';
// import ExpensesList from './ExpensesList';
// import ExpensesChart from './ExpensesChart';
import './Expenses.css';
import Expenseschart from './Expenseschart';
import ExpensesList from './ExpensesList';
import ExpensesFilter from './ExpensesFilter';

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState('2020');

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  console.log(props.items);

  let filteredExpenses = [];
if (Array.isArray(props.items)) {
  filteredExpenses = props.items.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const expenseYear = expenseDate.getFullYear();
    return expenseYear && typeof expenseYear === 'number' && expenseYear.toString() === filteredYear;
  });
}
  
  // const filteredExpenses = props.items.filter((expense) => {
  //   return expense.date.getFullYear().toString() === filteredYear;
  // });

  return (
    <div>
      <Card className='expenses'>
        <ExpensesFilter
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />
        <Expenseschart expenses={filteredExpenses} />
        <ExpensesList items={filteredExpenses} deleteExpense={props.onDeleteHandler} onUpdateHandler={props.onUpdateHandler}/>
      </Card>
    </div>
  );
};

export default Expenses;






























// import React, { useState } from 'react';
// 
// import ExpenseItem from './ExpenseItem';
// import Card from '../UI/Card';
// import ExpensesFilter from '../NewExpense/ExpensesFilter';
// import './Expenses.css';
// import Expenseschart from './Expenseschart';
// 
// const Expenses = (props) => {
  // console.log(props);
  // const [filteredYear, setFilteredYear] = useState('2020');
  // const filterChangeHandler = (selectedYear) => {
    // setFilteredYear(selectedYear);
  // };
  // const parsedDate = new Date();

  // let filteredExpenses = [];
  // if (Array.isArray(props.items)) {
  // filteredExpenses = props.items.filter((expense) => {
    // return expense.date.getFullYear().toString() === filteredYear
  // });
// }

// let filteredExpenses = [];
// if (Array.isArray(props.items)) {
  // filteredExpenses = props.items.filter((expense) => {
    // const expenseYear = new Date(expense.date).getFullYear();
    // return expenseYear && typeof expenseYear === 'number' && expenseYear.toString() === filteredYear;
  // });
// }

// let filteredExpenses = [];
// if (Array.isArray(props.items)) {
  // filteredExpenses = props.items.filter((expense) => {
    // const expenseDate = new Date(expense.date);
    // const expenseYear = expenseDate.getFullYear();
    // return expenseYear && typeof expenseYear === 'number' && expenseYear.toString() === filteredYear;
  // });
// }
// 
// 
  // return (
    // <div>
      /* <Card className='expenses'> */
        /* <ExpensesFilter */
          // selected={filteredYear}
          // onChangeFilter={filterChangeHandler}
        // />
         /* <Expenseschart expenses={filteredExpen{/*       */
   


         /* {filteredExpenses.map((expense) => {
  {props.items.map((expense) => (
    <ExpenseItem
      key={expense._id}
      title={expense.title}
      amount={expense.amount}
      date={expense.date} >
         </ExpenseItem>
  ))}
})} */
   
   
   
   
   
  
      
        
 
 
    /* <ExpenseItem
      key={expense._id}
      title={expense.title}
      amount={expense.amount}
      date={expense.date} >
   </ExpenseItem> */

        
        
      // </Card>
    // </div>
  // );
// };
// 
// export default Expenses;
// 




// filteredExpenses.map((expense) => (
  // {props.items.map((expense) => (
    // <ExpenseItem
      // key={expense._id}
      // title={expense.title}
      // amount={expense.amount}
      // date={expense.date} >
         /* </ExpenseItem> */
  // ))}