import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Studentlist from './components/Studentlist';
import Studentupdate from './components/Studentupdate';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Studentlist />} />
          <Route path='/studentupdate/:id/:name/:email/:mobilenumber/:address' element={<Studentupdate />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
