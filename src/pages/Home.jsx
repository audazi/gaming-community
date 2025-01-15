import MainContent from '../components/sections/MainContent';
import Sidebar from '../components/sections/Sidebar';
import LatestArticles from '../components/sections/LatestArticles';
import Community from '../components/sections/Community';

const Home = () => {
  return (
    <main>
      <div className="cards-container">
        <MainContent />
        <Sidebar />
      </div>
      <div className="sections-wrapper">
        <LatestArticles />
        <Community />
      </div>
    </main>
  );
};

export default Home;
