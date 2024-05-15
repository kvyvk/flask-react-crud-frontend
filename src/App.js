
import './App.css';
import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  

  //checking authentication
  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem('is_authenticated')));
  }, []);
  
  return (
    //if isAuthenticated state is true goes to Dashboard Component. else it stays in login page.
    <>
      {isAuthenticated ? (
        <Dashboard setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </>
  );
};

export default App;
