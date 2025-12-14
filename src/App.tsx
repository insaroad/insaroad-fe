import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/kiosk/startPage/StartPage';
import EnterNumPage from './pages/kiosk/enterNumPage/EnterNumPage';
import MissionDescriptionPageAnimal from './pages/kiosk/animalMissionPage/MissionDescriptionPageAnimal';
import AnimalPage1 from './pages/kiosk/animalMissionPage/AnimalPage1';
import AnimalPage2 from './pages/kiosk/animalMissionPage/AnimalPage2';
import AnimalPage3 from './pages/kiosk/animalMissionPage/AnimalPage3';
import AnimalResultPage from './pages/kiosk/animalMissionPage/AnimalResultPage';

import './App.css';
import MissionDescriptionPageKorean from './pages/kiosk/koreanNamePage/MissionDescriptionPageKorean';
import KoreanNamePage1 from './pages/kiosk/koreanNamePage/KoreanNamePage1';
import KoreanNamePage2 from './pages/kiosk/koreanNamePage/KoreanNamePage2';
import KoreanNamePage3 from './pages/kiosk/koreanNamePage/KoreanNamePage3';
import KoreanNameResultPage from './pages/kiosk/koreanNamePage/KoreanNameResultPage';

import MissionDescriptionPageSignboard from './pages/kiosk/signboardPage/MissionDescriptionPageSignboard';
import SignBoardPage1 from './pages/kiosk/signboardPage/SignBoardPage1';
import SignBoardPage2 from './pages/kiosk/signboardPage/SignBoardPage2';

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/kiosk">
                    <Route index element={<StartPage />} />
                    <Route path="keep" element={<EnterNumPage />} />
                    <Route path="missions">
                        <Route path="animal">
                            <Route index element={<MissionDescriptionPageAnimal />} />
                            <Route path="page1" element={<AnimalPage1 />} />
                            <Route path="page2" element={<AnimalPage2 />} />
                            <Route path="page3" element={<AnimalPage3 />} />
                            <Route path="result" element={<AnimalResultPage />} />
                        </Route>
                        <Route path="korean-name">
                            <Route index element={<MissionDescriptionPageKorean />} />
                            <Route path="page1" element={<KoreanNamePage1 />} />
                            <Route path="page2" element={<KoreanNamePage2 />} />
                            <Route path="page3" element={<KoreanNamePage3 />} />
                            <Route path="result" element={<KoreanNameResultPage />} />
                        </Route>
                        <Route path="signboard">
                            <Route index element={<MissionDescriptionPageSignboard />} />
                            <Route path="page1" element={<SignBoardPage1 />} />
                            <Route path="page2" element={<SignBoardPage2 />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
