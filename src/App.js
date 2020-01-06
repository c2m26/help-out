import React from 'react'
import  {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './components/home/Home.js'

function App() {
    
  return (
    <BrowserRouter>
      <Switch>
          <Route path="/" component={Home} exact />
      </Switch> 
  </BrowserRouter>
  )
            
} 

export default App