import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign';
import Home from './src/TabsBar/Home/home';
import Favorits from './src/TabsBar/Favorits/favorits';
import Account from './src/TabsBar/Account/account';
import PrimeiraTela from './src/PreLoad/primeiroContatoDeLogin/primeiraTela';
import COLORS from './src/components/COLOR';
import {StatusBar, BackHandler, ToastAndroid} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const navigation = useNavigation();

  let backButtonPressTime = 0;

  React.useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        if (1 + 1) {
          navigation.navigate('Login');
          console.log('ai');
        }
        const currentTime = new Date().getTime();

        if (currentTime - backButtonPressTime < 5000) {
          BackHandler.exitApp();
          return false;
        } else {
          ToastAndroid.show(
            'Pressione novamente para sair',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
            ToastAndroid.TOP,
          );
          backButtonPressTime = currentTime;
          return true;
        }
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <>
      {/* <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      /> */}
      <Tab.Navigator
        backBehavior="initialRoute"
        screenOptions={({route}) => ({
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            backgroundColor: COLORS.orangeWarning,
            borderTopWidth: 0,
            bottom: 14,
            left: 14,
            right: 14,
            elevation: 0.2,
            borderRadius: 8,
            height: 60,
          },
          tabBarIcon: ({color, size, focused}) => {
            let icone;

            if (route.name === 'Home') {
              icone = 'home';
            } else if (route.name === 'Favorits') {
              icone = 'hearto';
            } else if (route.name === 'Account') {
              icone = 'user';
            }

            corClicado = focused ? COLORS.redWarning : COLORS.black;
            return <Icon name={icone} size={28} color={corClicado} />;
          },
        })}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Tab.Screen name="Favorits" component={Favorits} />
        <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
    </>
  );
};

export default MainTabs;
