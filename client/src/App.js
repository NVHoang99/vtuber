import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import Login from './components/Login.jsx';

function App() {
    return (
        <Routes>
            <Route path='login' element={<Login />} />

            <Route path='/*' element={<HomePage />} />
        </Routes>
    );
}

export default App;
