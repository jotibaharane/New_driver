import { useDriverLiveLocation } from '@hooks/useDriverLiveLocation';
import { useIsFocused } from '@react-navigation/native';
import { RootState } from '@store/index';
import { useSelector } from 'react-redux';
import FirstScreen from './FirstScreen';
import SecondScreen from './SecondScreen';

const MainDashboard = () => {
  const { driverDetails, isOnline, tripStatus } = useSelector(
    (state: RootState) => state.auth,
  );

  const isFocus = useIsFocused();

  useDriverLiveLocation({
    isFocus,
    isOnline,
    driverDetails,
    tripStatus,
  });

  return tripStatus === 'Inactive' ? <FirstScreen /> : <SecondScreen />;
};

export default MainDashboard;
