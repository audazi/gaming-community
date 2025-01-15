import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Events from './pages/Events';
import Updates from './pages/Updates';
import Archives from './pages/Archives';
import Teams from './pages/Teams';
import Rules from './pages/Rules';
import Tournaments from './pages/Tournaments';
import Demos from './pages/Demos';
import Results from './pages/Results';
import Forum from './pages/Forum';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/updates" element={<Updates />} />
          <Route path="/archives" element={<Archives />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/demos" element={<Demos />} />
          <Route path="/results" element={<Results />} />
          <Route path="/forum" element={<Forum />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
