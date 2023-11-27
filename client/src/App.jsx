import { BrowserRouter } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import './styles/reset.css';
import './styles/index.css';

function App() {
  return (
    <BrowserRouter>
      <AdminPanel />
    </BrowserRouter>
  );
}

export default App;
