import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/kiosk/StartPage';
import './App.css';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/kiosk">
          <Route index element={<StartPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
