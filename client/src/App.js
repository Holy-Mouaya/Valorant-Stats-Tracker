import React, {useEffect, useState} from 'react';
import './App.css';
import IntroCard from './components/IntroCard';
import GetForm from './components/GetForm';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/pages/Home';
import StatsDisplay from './components/pages/StatsDisplay';

export const usernameContext = React.createContext({ value: null, setValue: () => {} })

function App() {

  const [value, setValue] = useState(null);

  return (
    <div className="App">
      <usernameContext.Provider value={{value, setValue}}>
        <Router>
          <Routes>
            <Route path='/Statistics/:username:tag' element= {<StatsDisplay/>}>
            </Route>
            <Route path='/' element= {<Home/>}>
            </Route>
          </Routes>
        </Router>
      </usernameContext.Provider>  
    </div>
  )
}
export default App