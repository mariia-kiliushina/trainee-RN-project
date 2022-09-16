import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ScreenNavigation} from 'src/navigation/stack';

const App = () => {
  return (
    <NavigationContainer>
      <ScreenNavigation />
    </NavigationContainer>
  );
};

export default App;
