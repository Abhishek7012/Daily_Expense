
import Card from '../UI/Card';

import './ExpenseItem.css';
import ExpenseDate from './ExpenseDate';


const ExpenseItem = (props) => {
  const parsedDate = new Date(props.date);
  const title = props.title;
  const date = props.date;
  const amount = props.amount;
  const id = props.id;


  const handleClick = () => {
    props.deleteExpense(props.title);

  };



  const handleUpdate = () => {
    const data = {
      title, date, amount, id
    }
    props.onUpdateHandler(data)
  }

  return (

    <Card className='expense-item'>
      <ExpenseDate date={new Date(parsedDate)} />
      <div className='expense-item__description'>
        <h2>{props.title}</h2>
        <div className='expense-item__price'>₹{props.amount}</div>
      </div>
      <button onClick={handleClick}>Delete</button>
      <button onClick={handleUpdate}>Update</button>
    </Card>
  );
}

export default ExpenseItem;