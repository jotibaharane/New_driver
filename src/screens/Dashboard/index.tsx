import FirstScreen from '@components/Dashboard/FirstScreen';
import Layout from '@components/Dashboard/Layout';
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

  return (
    <Layout>
      {tripStatus === TRIP_STATUS.Inactive ? <FirstScreen /> : <SecondScreen />}
    </Layout>
  );
};

export default MainDashboard;
