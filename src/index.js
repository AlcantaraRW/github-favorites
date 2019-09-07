import React from 'react';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';
import Routes from './routes';
import { DARK_MODERATE_BLUE } from './styles/colors';

const App = () => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={DARK_MODERATE_BLUE}
      />
      <Routes />
    </>
  );
};

export default App;
