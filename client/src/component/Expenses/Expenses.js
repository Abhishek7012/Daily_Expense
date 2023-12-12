import React, { useState } from 'react';

import Card from '../UI/Card';

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





















