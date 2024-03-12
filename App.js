import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PrimeiraTela from './src/PreLoad/primeiroContatoDeLogin/primeiraTela';
import MainTabs from './routes';
import Login from './src/PreLoad/login/login';
import Cadastro from './src/PreLoad/Cadastro/cadastro';
import {StatusBar} from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />

      <NavigationContainer>
        <Stack.Navigator initialRouteName="PrimeiraTela">
          <Stack.Screen
            name="PrimeiraTela"
            component={PrimeiraTela}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Cadastro"
            component={Cadastro}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
