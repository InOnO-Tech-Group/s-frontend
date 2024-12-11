import { Link } from 'react-router-dom';
import SEO from '../../components/re-usable/SEO';
import Landing from '../../components/clients/Landing';


const Homepage = () => {
  return (
    <>
      <SEO title="ES Gishom Home" description="The homepage of ES Gishoma" />
      <Landing/>
    </>
  );
};

export default Homepage;