import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage/AuthPage';
import MainPage from './pages/MainPage/MainPage';
import { IsLoginedProvider } from './hooks/IsLogined';

function App() {
  return (
    <div className="App">
      <IsLoginedProvider>
        <Router>
          <Routes>
            <Route path='/login' element={<AuthPage/>} />
            <Route path='/signup' element={<AuthPage/>} />
            <Route path='/main/:organizationId?/:channelId?' element={<MainPage/>} />
            <Route path='/meeting/:meetingId' element={<MainPage/>} />
          </Routes>
        </Router>
      </IsLoginedProvider>
    </div>
  );
}

export default App;
