import './output.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './routes/Home'
import Medical from './routes/Medical';
import Meeting from './routes/Meeting';
import Vacation from './routes/Vacation';
import Wedding from './routes/Wedding';

function App() {
  return (
    <div className='w-screen h-screen font-poppins '>
      <BrowserRouter>
        <Routes>
          <Route
            path='/home'
            element=<Home />
          />
          <Route
            path='/medical'
            element=<Medical />
          />
          <Route
            path='/meetings'
            element=<Meeting />
          />
          <Route
            path='/vacation'
            element=<Vacation />
          />
          <Route
            path='/weddings'
            element=<Wedding />
          />
          <Route
            path='*'
            element=<Navigate to='/home' />
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;