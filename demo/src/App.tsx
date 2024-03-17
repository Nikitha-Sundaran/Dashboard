import React , {useState} from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { Routes , Route } from 'react-router-dom';
import  MyContext  from "./MyContext";
import "./App.css"


function App() {

  const [text, setText] = useState<any>();
  return (
    <div>
         <MyContext.Provider value={{ text, setText }}>
            
      
          <Routes>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
            <Route path='/' element={<Login/>}></Route>
          </Routes>
        </MyContext.Provider>
    </div>
  );
}

export default App;
