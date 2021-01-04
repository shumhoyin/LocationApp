import React from 'react';

import 'react-native-gesture-handler';
import {Provider} from 'react-redux';

import store from './app/redux/store';
import MainNavigation from './app/component/MainNavigation';

function App() {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}

export default App;
