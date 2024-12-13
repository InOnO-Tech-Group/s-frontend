import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AppRouter from './routes';
import ScrollToTop from './components/ScrollTop';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
      <ScrollToTop/>
        <AppRouter />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
