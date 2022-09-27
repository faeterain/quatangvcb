import logo from './logo.svg';
import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import QuyDoi from './pages/QuyDoi';
import XacNhan from './pages/XacNhan';

function App() {
  return (
    <div className="App">
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/quydoi'>Quy Doi</Link></li>
        <li><Link to='/xacnhan'>Approve</Link></li>
      </ul>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/quydoi' element={<QuyDoi />} />
        <Route path='/xacnhan' element={<XacNhan />} />
      </Routes>
    </div>
  );
}

export default App;
