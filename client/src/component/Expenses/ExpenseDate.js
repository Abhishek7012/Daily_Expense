

import './ExpenseDate.css';

const ExpenseDate = (props) => {
  // console.log('props', props.date);


  // Check if props.date is a valid Date object
  if (!props.date || !(props.date instanceof Date)) {
    // If not, try to parse it as a date string
    const parsedDate = Date.parse(props.date);
    if (isNaN(parsedDate)) {
      // If parsing fails, render an error message
      return <div className="expense-date">Invalid Date</div>;
    }
    // If parsing succeeds, create a new Date object using the parsed date value
    props.date = new Date(parsedDate);
  }

  const day = props.date.toLocaleString('en-us', { day: '2-digit' });
  const month = props.date.toLocaleString('en-US', { month: 'long' });
  const year = props.date.getFullYear();

  // console.log('day', day);
  
  return (
    <div className='expense-date' >
      <div className='expense-date__day'>{day}</div>
      <div className='expense-date__month'>{month}</div>
      <div className='expense-date__year'>{year}</div>
    </div>
  );
}

export default ExpenseDate;
