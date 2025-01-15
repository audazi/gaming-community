import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import MainContent from './components/sections/MainContent';
import Sidebar from './components/sections/Sidebar';
import LatestArticles from './components/sections/LatestArticles';
import Community from './components/sections/Community';
import Events from './pages/Events';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <div className="cards-container">
                  <MainContent />
                  <Sidebar />
                </div>
                <div className="sections-wrapper">
                  <LatestArticles />
                  <Community />
                </div>
              </>
            } />
            <Route path="/events" element={<Events />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
