import logo from './logo.svg';
import './App.css';

function App() {
  const initialize = async () => {
    console.log("tafa");
  }
  const registerUser = (data) => {
    console.log("ok");
    initialize();
  }
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
        <form onSubmit={registerUser }>
            <p><input type="submit" value="Submit"/></p>
        </form>
      </header>
    </div>
  );
}

export default App;
