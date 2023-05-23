import React, { useState, useEffect } from 'react';

import NewExpense from './component/NewExpense/NewExpense'
import Expenses from './component/Expenses/Expenses';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    title: 'Tolet Paper',
    amount: 94.12,
    date: new Date(2023, 7, 14),
  },
  { id: 'e2', title: 'New TV', amount: 799.49, date: new Date(2024, 2, 12) },
  {
    id: 'e3',
    title: 'Car Insurance',
    amount: 294.67,
    date: new Date(2025, 2, 28),
  },
  {
    id: 'e4',
    title: 'New Desk (Wooden)',
    amount: 450,
    date: new Date(2022, 5, 12),
  },
];

const App = () => {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);
  const [response, setResponse] = useState([]);

  const addExpenseHandler = async (expense) => {
    console.log('expense', expense);
    const myData = {
      title: expense.title,
      amount: expense.amount,
      date: expense.date.toISOString(),
    };
    try {
      const result = await fetch('http://localhost:8080/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(myData)
      });

      const resultInJson = await result.json();
       console.log(resultInJson)
      setResponse((prev) => [...prev, resultInJson]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch('http://localhost:8080/list')
        const jsonResult = await result.json()
        setResponse(jsonResult);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData()
  }, [])


  return (
    <>
      <div>
        {response && <p>{response.message}</p>}
      </div>


      <div>
        <NewExpense onAddExpense={addExpenseHandler} />
        <Expenses items={expenses} />
      </div>
    </>
  );
};

export default App;