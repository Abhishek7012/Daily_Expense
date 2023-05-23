import React, { useState } from 'react';
import './NewExpenses.css';
import ExpenseForm from './ExpenseForm';

// child component
const NewExpense = (props) => {
    const [isEditing, setIsEditing] = useState(false)
        const startEditingHandler = () => {
            setIsEditing(true);
        };

    /* `const saveExpenseDataHandler` is a function that takes in `enteredExpenseData` as a parameter.
    It creates a new object `expenseData` by spreading the `enteredExpenseData` and adding a new
    `id` property with a unique value generated using `Math.random().toString()`. It then calls the
    `onAddExpense` function passed down from the parent component with the `expenseData` object as
    an argument to add the new expense to the list of expenses. Finally, it sets the `isEditing`
    state to `false` to close the expense form. */
    const saveExpenseDataHandler = (enteredExpenseData) => {
     const expenseData = {
        ...enteredExpenseData,
        id: Math.random().toString()
     };   

/* `props.onAddExpense(expenseData)` is calling the `onAddExpense` function that was passed down from
the parent component as a prop. It is passing the `expenseData` object as an argument to this
function, which adds the new expense to the list of expenses. */
     props.onAddExpense(expenseData);
     setIsEditing(false);
    };
    const stopEditingHandler = () => {
        setIsEditing(false);
    };

    return ( 
    <div className="new-expense">
        {/* child component */}
     {!isEditing &&<button onClick={startEditingHandler}>Add New Expense</button>}   
     {isEditing && <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} onCancel={stopEditingHandler}/>}
    </div>
    );
};

export default NewExpense;