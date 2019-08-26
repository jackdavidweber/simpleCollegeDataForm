import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Main from './Main';
import StickyFooter from './Success';


const Home = () => (
  <div>
    Home
  </div>
)

const About = () => (
  <div>
    About
  </div>
)

const Code = () => (
  <div>
    Code
  </div>
)

const Contact = () => (
  <div>
    Contact
  </div>
)

const info = () => (
  <div>
    info
  </div>
)

const MainMenu = () => {
return (
<div>
  <Link to="/">
    <button>home</button>
  </Link>
  <Link to="/about">
    <button>About</button>
  </Link>
  <Link to="/code">
    <button>code</button>
  </Link>
  <Link to="/contact">
    <button>contact</button>
  </Link>
  <Link to="/info">
    <button>info</button>
  </Link>
</div>
);
};

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
            <MainMenu />
          </header> */}
          <div>
            <Route exact path="/" component={Main} />
            <Route exact path="/about" component={StickyFooter} />
            <Route exact path="/code" component={Main} />
            <Route exact path="/contact" component={Main} />
            <Route exact path="/presence" component={Main} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
