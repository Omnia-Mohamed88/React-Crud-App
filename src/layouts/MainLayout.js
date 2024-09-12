import { Outlet} from 'react-router-dom';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import UseAuth from 'hooks/UseAuth';

const MainLayout = () => {
  const { roles } = UseAuth();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Outlet /> 
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
