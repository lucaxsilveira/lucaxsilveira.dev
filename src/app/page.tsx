import FlashlightBackground from '@/components/FlashlightBackground';
import Intro from '@/components/Intro';
import SearchBar from '@/components/SearchBar';

const Home = () => {
  return (
    <FlashlightBackground>
      <SearchBar />
      <Intro />
    </FlashlightBackground>
  );
};

export default Home;
