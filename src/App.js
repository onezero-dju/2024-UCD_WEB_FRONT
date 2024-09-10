import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage/AuthPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/login' element={<AuthPage/>} />
          <Route path='/signup' element={<AuthPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
