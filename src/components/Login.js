import React from 'react'
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Login = ({setIsAuthenticated}) => {
  const adminEmail = 'user@gmail.com';
  const adminPassword = 'user';
  
  const [email, setEmail] = useState('user@gmail.com');
  const [password, setPassword] = useState('user');

  const handleLogin = e => {
    e.preventDefault();

    if (email === adminEmail && password === adminPassword) {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          localStorage.setItem('is_authenticated', true);
          setIsAuthenticated(true);

          Swal.fire({
            icon: 'success',
            title: 'Successfully logged in!',
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
    } else {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Incorrect email or password.',
            showConfirmButton: true,
          });
        },
      });
    }
  };
  return (
    <div>
      <><nav class="navbar  bg-default" style={{backgroundColor:"lightcoral"}}>
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Login Screen</a>
      </div>
    </nav><div className="small-container">
        <form onSubmit={handleLogin}>


          <label htmlFor="email">Email</label>
          <input className='form-control'
            id="email"
            type="email"
            name="email"
            placeholder="admin@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)} />
          <label htmlFor="password">Password</label>
          <input className='form-control'
            id="password"
            type="password"
            name="password"
            placeholder="qwerty"
            value={password}
            onChange={e => setPassword(e.target.value)} />
            <div className=" row ">
            <div className='col-md-3'>
            <input className='form-control btn btn-default ' style={{ marginTop: '12px',backgroundColor:"lightblue" }} type="submit" value="Login" />
            </div>
            </div>
           
         
        </form>
      </div></>
    </div>
  )
}

export default Login
