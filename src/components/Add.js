import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Add = ({ handleAdd , setShowAdd}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = e => {
    setShowAdd(false)
    e.preventDefault();
    const newEmployee = { firstName, lastName, email, salary, date };
    handleAdd(newEmployee);
    setFirstName('');
    setLastName('');
    setEmail('');
    setSalary('');
    setDate('');
    
  };
 
   

  return (
    <div className="small-container">
      <form onSubmit={handleSubmit}>
        <h1>Add Employee</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="salary">Salary ($)</label>
        <input
          id="salary"
          type="number"
          name="salary"
          value={salary}
          onChange={e => setSalary(e.target.value)}
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add"  />
        </div>
      </form>
    </div>
  );
};

export default Add;
