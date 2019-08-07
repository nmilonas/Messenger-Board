import React, { Component } from 'react';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import { Home } from './Home';
//import { NoMatch } from './NoMatch';
import axios from 'axios'
import PersonList from './Components/Messages';
import MessageSend from './Components/Messages';

class  App extends Component {
  render(){
    return (
           <div> 
             <MessageSend/> 
           </div> 
        )
  }
}

export default App;
    // <React.Fragment>
    //   <Router>
    //     <Switch>
    //       <Route  exact path='/' compoment={ Home } />
    //       <Route component={ NoMatch } />
    //     </Switch>    
    //   </Router>
    // </React.Fragment>

    