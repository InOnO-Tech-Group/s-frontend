import { Link } from 'react-router-dom';
import SEO from '../components/re-usable/SEO';
import Header from '../components/clients/Header';
import Footer from '../components/clients/Footer';
import Landing from '../components/clients/Landing';


const Homepage = () => {
  return (
    <>
      <SEO title="ES Gishom Home" description="The homepage of ES Gishoma" />
      <Header />
      <Landing/>
      <Footer />
    </>
  );
};

export default Homepage;
