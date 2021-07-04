// import 'react-native-gesture-handler';
// import {HomeScreen} from '../screens/HomeScreen';
// import {SongScreen} from '../screens/SongScreen';

// import * as React from 'react';

// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import {createDrawerNavigator} from '@react-navigation/drawer';

// const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

// // const Root = () => {
// //   return (
// //     <Stack.Navigator>
// //       <Stack.Screen name="Product" component={ProductScreen} />
// //       <Stack.Screen name="Transactions" component={TransactionScreen} />
// //     </Stack.Navigator>
// //   );
// // };

// export const AppNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator>
//         <Drawer.Screen name="Home" component={HomeScreen} />
//         <Drawer.Screen name="Song" component={SongScreen} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// };

import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreen';
import {SongScreen} from '../screens/SongScreen';

const Stack = createStackNavigator();
export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: null}}
        />

        <Stack.Screen
          name="Song"
          component={SongScreen}
          options={{headerShown: null}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
