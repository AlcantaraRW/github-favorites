import { createAppContainer, createStackNavigator } from 'react-navigation';

import Main from './pages/Main';
import User from './pages/User';
import Repo from './pages/Repo';
import { MODERATE_BLUE, WHITE } from './styles/colors';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User,
      Repo,
    },
    {
      headerLayoutPreset: 'center',
      headerBackTitleVisible: false,
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: MODERATE_BLUE,
        },
        headerTintColor: WHITE,
      },
    },
  ),
);

export default Routes;
