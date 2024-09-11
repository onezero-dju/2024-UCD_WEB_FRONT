import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage/AuthPage';
import MainPage from './pages/MainPage/MainPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/login' element={<AuthPage/>} />
          <Route path='/signup' element={<AuthPage/>} />
          <Route path='/main' element={<MainPage/>} />
          <Route path='/main/:organizationId/:channelId' element={<MainPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
