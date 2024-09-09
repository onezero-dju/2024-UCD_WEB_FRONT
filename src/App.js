import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/login' element={<AuthPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
