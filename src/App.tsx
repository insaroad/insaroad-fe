import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/kiosk/StartPage/StartPage';
import './App.css';
import KioskRootLayout from './layouts/KioskRootLayout';
import DescriptionPage from './pages/kiosk/DescriptionPage/DescriptionPage';

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/kiosk">
                    <Route index element={<StartPage />} />
                    <Route element={<KioskRootLayout />}>
                        <Route path="description" element={<DescriptionPage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
