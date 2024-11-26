import { Link } from 'react-router-dom';
import SEO from '../components/re-usable/SEO';

const Homepage = () => {
  return (
    <>
      <SEO title="ES Gishom Home" description="The homepage of ES Gishoma" />
      <div className="min-h-screen justify-center bg-blue-500 text-white">
        <h1 className="text-3xl font-bold">Homepage</h1>
        <br />
        <p>Welcome to our homepage</p>
        <Link to="/test" className='underline'>Test backend connection</Link>
      </div>
    </>
  );
};

export default Homepage;
