import './App.css';
import FileList from './components/FileList/FileList';
import Login from './components/Login/Login';

function App() {

  // const getData = fetch('/api/v1/auth...')
  // const getData = fetch('https://mydomain.net/api/v1/auth...')
  return (
    <div className="App">
      <header className="App-header">
        
       <Login />
       <FileList/>
      </header>
    </div>
  );
}

export default App;
