import FirstScreen from '@components/Dashboard/FirstScreen';
import SecondScreen from '@components/Dashboard/SecondScreen';
import { useDriverLiveLocation } from '@hooks/useDriverLiveLocation';
import { useIsFocused } from '@react-navigation/native';
import { RootState } from '@store/index';
import { TRIP_STATUS } from '@store/slices/authSlice';
import { useSelector } from 'react-redux';

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

  return tripStatus === TRIP_STATUS.Inactive ? (
    <FirstScreen />
  ) : (
    <SecondScreen />
  );
};

export default MainDashboard;
