import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import 'antd/dist/reset.css';
import './styles/index.css';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
