import Hero from '../components/Hero';
import { useSelector } from 'react-redux';
import HomePage from '../components/HomePage';

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo ? <HomePage /> : <Hero />;
};
export default HomeScreen;
