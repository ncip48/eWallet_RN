/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import {UserContextProvider} from './src/context/userContext';
import App from './App';
import {name as appName} from './app.json';

// const Root = () => {
//   return (
//     <UserContextProvider>
//       <App />
//     </UserContextProvider>
//   );
// };

AppRegistry.registerComponent(appName, () => App);
