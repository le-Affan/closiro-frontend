import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SecondSidebar from './components/SecondSidebar';
import TopBar from './components/TopBar';
import DashboardPage from './pages/DashboardPage';
import LivePage from './pages/LivePage';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

function App() {
  return (
    <BrowserRouter>
      <div
        className="flex h-screen overflow-hidden tracking-tight"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <Sidebar />
        <div className="flex flex-col flex-1">
          <TopBar />
          <div className="flex flex-1 overflow-hidden">
            <SecondSidebar />
            <main className="flex-1 overflow-auto bg-white">
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/live" element={<LivePage />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
