import React, { useState, useEffect } from 'react';

import NewExpense from './component/NewExpense/NewExpense'
import Expenses from './component/Expenses/Expenses';


function App(props) {
  const [response, setResponse] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [id, setId] = useState("");

  const deleteHandler = (title) => {
    fetch(`https://expense-backend-aeb5d.web.app/delete/${title}`, {
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
      const result = await fetch('https://expense-backend-aeb5d.web.app//create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(myData)
      });

      const resultInJson = await result.json();
      setResponse(response => {
        if (response.length === 0) {
          return [resultInJson]; // Create a new array with resultInJson if response is empty
        } else {
          return [...response, resultInJson]; // Spread response and add resultInJson if response is not empty
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
      const result = await fetch('https://expense-backend-aeb5d.web.app/list')
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
  console.log('resonse', response);


  const updateHandler = (data) => {
    console.log('data updateHandler', data);
    /* `setTitle(data[0].title)` is updating the state variable `title` with the value of `data[0].title`.
    This is used in the input field to display the current value of the title of the first expense in
    the list. */
    setTitle(data.title)
    setDate(data.date)
    setAmount(data.amount)
    setId(data.id)
  }

  console.log('id', id);
  /**
   * This function updates a user's data by sending a PUT request to a specified URL with the updated
   * data in JSON format.
   */
  function updateUser() {
    let item = { title, date, amount };
    console.log('item', item);
    fetch(`https://expense-backend-aeb5d.web.app/update/${id}`, {
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
