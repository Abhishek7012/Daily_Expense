import React, { useState, useEffect } from 'react';
import NewExpense from './component/NewExpense/NewExpense'
import Expenses from './component/Expenses/Expenses';


function App() {
  const [response, setResponse] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [id, setId] = useState("");

  const deleteHandler = (title) => {
    fetch(`https://expense-backend-9gvx.onrender.com/delete/${title}`, {
      method: 'DELETE'
    }).then((result) => {
      result.json().then((res) => {

        const filteredArray = response.filter(item => item.title !== title)
        setResponse(filteredArray)
      })
    }).catch((error) => {
      console.log(error);
    });
  };

  const addExpenseHandler = async (expense) => {
    console.log('expense', expense);
    const myData = {
      title: expense.title,
      amount: expense.amount,
      date: expense.date.toISOString(),
    };
    try {
      const result = await fetch('https://expense-backend-9gvx.onrender.com/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(myData)
      });

      const resultInJson = await result.json();
      setResponse(response => {
        if (response.length === 0) {
          return [resultInJson]; 
        } else {
          return [...response, resultInJson]; 
        }
      });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const result = await fetch('https://expense-backend-9gvx.onrender.com/list')
      const jsonResult = await result.json()
      setResponse(jsonResult.data);
      setTitle(jsonResult.data[0].title)
      setDate(jsonResult.data[0].date)
      setAmount(jsonResult.data[0].amount)
      setId(jsonResult.data[0]._id)
    } catch (error) {
      console.log(error);
    }
  };
   const updateHandler = (data) => {
   
    setTitle(data.title)
    setDate(data.date)
    setAmount(data.amount)
    setId(data.id)
  }

 
  function updateUser() {
    let item = { title, date, amount };
    fetch(`https://expense-backend-9gvx.onrender.com/update/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    }).then((result) => {
      result.json().then((res) => {
        console.log(res);
        fetchData()

      })
    })
  }

  return (
    <>
      <div>
        {response && <p>{response.message}</p>}
        <NewExpense onAddExpense={addExpenseHandler} />
        <Expenses items={response} onDeleteHandler={deleteHandler} onUpdateHandler={updateHandler} />
      </div>
      <div className="new-expense">
        <div className="new-expense__control" >
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /> <br></br>
        </div>
        <div className="new-expense__control" >
          <label>Date</label>
          <input type='text' value={date} onChange={(e) => setDate(e.target.value)} /> <br></br>
        </div>
        <div className="new-expense__control" >
          <label>Amount</label>
          <input type='text' value={amount} onChange={(e) => setAmount(e.target.value)} /> <br></br>
        </div>
        <button onClick={updateUser} >Update User</button>
      </div>
    </>
  );
};

export default App;
