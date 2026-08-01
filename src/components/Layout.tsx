import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import LuxuryAtmosphere from './LuxuryAtmosphere';
import Sidebar from './Sidebar';
import Container from './ui/Container';
import { useTheme } from '../theme/ThemeContext';

function Layout() {
  const { theme } = useTheme();

  return (
    <div className="relative min-h-screen bg-background">
      {theme === 'luxury-noir' ? <LuxuryAtmosphere /> : null}
      <div className="relative z-10">
        <Sidebar />
        <main className="px-6 py-16 sm:px-10 lg:px-16 xl:py-20">
          <Container>
            <Outlet />
          </Container>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
