//OK STARTING HERE- Day1 
import React, { Component } from 'react';

//for my routes
import { Route, Link, Switch } from 'react-router-dom';
import Users from './users/users'


import logo from './logo.svg';
import './App.css';



class App extends Component {


  homepage = () => {
    return (
      null
    )
  }

  render() {
    return (
      <div className="App">
        <nav>
       
          <Link to='/users/new'> Sign UP </Link> { "|" }
          <Link to='/users'> Log-In </Link>
        </nav>

        <Route path='/' render={this.homepage} />
        <Route path='/users' component={Users} />
      </div>
    );
  }
}
export default App;
//      <Link to='/users'> User List </Link> {" | "}

// return (
//   <div className="App">
//     <header className="App-header">
//       <img src={logo} className="App-logo" alt="logo" />
//       <h1 className="App-title">Welcome to React</h1>
//     </header>
//     <p className="App-intro">
//       To get started, edit <code>src/App.js</code> and save to reload.
//     </p>
//   </div>
// );
// }