import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import About from './Components/About';
import Timer from './Components/Timer';
import Auth from './Components/Auth';
import History from './Components/History';

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/study' element={<Timer />} />
        <Route path='/history' element={<History />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
