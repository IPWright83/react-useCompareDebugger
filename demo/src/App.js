import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import { why } from "./why";

const Time = ({ currentTime }) => {
  return (<div>{currentTime}</div>)
};

const Person = function Person({ first, last }) {
  return <div><b>{first}</b> {last}</div>;
}

const Complex = why(function Complex({ foo }) {
  return <div>Complex</div>
})


function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setTimeout(() => setCount(Math.min(count + 1, 3)), 1000);
    return () => clearTimeout(id);
  }, [count])

  const date = new Date();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>{count}</div>
        <Time currentTime={date.toLocaleString()} />
        <Person first="Joe" last="Bloggs" />
        <Complex foo={{ nested: { a: 1, b: 2, c: { d: count }, e: { f: "bar" } } }} />
        {/*<Complex foo={{ a: 1 }} />*/}
      </header>
    </div>
  );
}

export default App;
