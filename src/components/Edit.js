import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Edit = ({ selectedEmployee, setEmployees, setIsEditing }) => {
  const [formData, setFormData] = useState({
    id: selectedEmployee.id,
    firstName: selectedEmployee.firstName,
    lastName: selectedEmployee.lastName,
    email: selectedEmployee.email,
    salary: selectedEmployee.salary,
    date: selectedEmployee.date
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/employees/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        // Employee updated successfully
        const updatedEmployee = await response.json();
        setEmployees(prevEmployees => prevEmployees.map(employee =>
          employee.id === updatedEmployee.id ? updatedEmployee : employee
        ));
        setIsEditing(false);
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: `${updatedEmployee.firstName} ${updatedEmployee.lastName}'s data has been updated.`,
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        // Handle error
        console.error('Failed to update employee');
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to update employee. Please try again.',
          showConfirmButton: true
        });
      }
    } catch (error) {
      // Handle network error
      console.error('Network error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Network error. Please try again.',
        showConfirmButton: true
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Employee</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="salary">Salary ($)</label>
        <input
          id="salary"
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
