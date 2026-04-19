import React, { useEffect } from 'react';
import {
  StatusBar,
  useColorScheme,
} from 'react-native';

import { setFirstTimeInstallation } from './src/reducers/app/appSlice';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';
import AppContainer from './src/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    console.log('inside useeffect');
    store.dispatch(setFirstTimeInstallation(false));
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
          <AppContainer/>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
