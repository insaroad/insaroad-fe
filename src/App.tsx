import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/kiosk/startPage/StartPage';
import EnterNumPage from './pages/kiosk/enterNumPage/EnterNumPage';
import MissionDescriptionPageAnimal from './pages/kiosk/missionDescriptionPageAnimal/MissionDescriptionPageAnimal';
import './App.css';

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/kiosk">
                    <Route index element={<StartPage />} />
                    <Route path="keep" element={<EnterNumPage />} />
                    <Route path="mission">
                        <Route path="animal" element={<MissionDescriptionPageAnimal />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
