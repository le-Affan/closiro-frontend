import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SecondSidebar from './components/SecondSidebar';
import TopBar from './components/TopBar';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const LivePage = lazy(() => import('./pages/LivePage'));
const DataPage = lazy(() => import('./pages/DataPage'));

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
            <main className="flex flex-col flex-1 overflow-hidden bg-white">
              <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/live" element={<LivePage />} />
                  <Route path="/data" element={<DataPage />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
