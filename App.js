import React from 'react';

import 'react-native-gesture-handler';
import {Provider} from 'react-redux';

import store from './app/redux/store';
import MainNavigation from './app/component/MainNavigation';


const App: () => React$Node = () => {

  return (
      <Provider store={store}>
          <MainNavigation />
      </Provider>
  );
};


export default App;
