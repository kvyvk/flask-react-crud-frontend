import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios'; // Import Axios library


import Table from './Table';
import Add from './Add';
import Edit from './Edit';
import Logout from './Logout';



const Dashboard = ({ setIsAuthenticated }) => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAdd, setShowAdd] = useState(false)

  const getEmployees = () => {


    //using axios to get employees from backend
    axios.get('http://localhost:5000/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
      });

  }

  //when component loads it should automatically get employees
  useEffect(() => { getEmployees() }, []);

  const handleEdit = id => {
    const employeeToEdit = employees.find(employee => employee.id === id);
    setSelectedEmployee(employeeToEdit);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    }).then(result => {
      if (result.isConfirmed) {
        //delete employees from db using backend
        axios.delete(`http://localhost:5000/employees/${id}`)
          .then(response => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: `${response.data.firstName} ${response.data.lastName}'s data has been deleted.`,
              showConfirmButton: false,
              timer: 1500,
            });
            getEmployees()
            // const updatedEmployees = employees.filter(employee => employee.id !== id);
            // setEmployees(employees);

          })
          .catch(error => {
            console.error('Error deleting employee:', error);
          });
      }
    });
  };

  const handleAdd = employee => {

    axios.post('http://localhost:5000/employees', employee)
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Added!',
          text: `${response.data.firstName} ${response.data.lastName}'s data has been added.`,
          showConfirmButton: false,
          timer: 1500,
        });
        getEmployees()
        setEmployees([...employees, response.data]);
      })
      .catch(error => {
        console.error('Error adding employee:', error);
      });
  };
  const changeAdd = () => {
    setShowAdd(true)
  }

  return (
    <>


      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <div className="row w-100">
            <div className="col-md-9">
              <a class="navbar-brand" href="#">Demo CPAD Class</a>
            </div>
            <div className="col-md-2  me-auto">
              <div class="d-flex">



                <input

                  className='btn btn-success ms-auto'
                  type="button"
                  value="Add Employee"
                  onClick={changeAdd}

                />

              </div>
            </div>


            <div className="col-md-1 mx-auto">
              <Logout setIsAuthenticated={setIsAuthenticated} />
            </div>

          </div>

        </div>
      </nav>

      <div className="container">


        {!showAdd ?
          <Table
            employees={employees}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          /> :
          <Add setShowAdd={setShowAdd} handleAdd={handleAdd} />}
        {isEditing &&
          <Edit
            selectedEmployee={selectedEmployee}
            setEmployees={setEmployees}
            setIsEditing={setIsEditing}
          />
        }
      </div>
    </>
  );
};

export default Dashboard;
