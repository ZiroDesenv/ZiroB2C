import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/Entypo';
import COLORS from '../../components/COLOR';
import Search from '../../components/search';

const Home = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregaDados();
  }, []);

  const carregaDados = () => {
    setLoading(true);
    buscaEnderecoUsuario();
    setLoading(false);
  };

  const buscaEnderecoUsuario = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});

        enderecoDoUsuario(latitude, longitude);
      },
      error => {
        console.error(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const enderecoDoUsuario = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
      );

      const data = await response.json();

      if (data && data.address) {
        setAddress(data.address);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.baseF3,
        paddingTop: StatusBar.currentHeight + 10,
      }}>
      {address ? (
        <View style={styles.enderecoHome}>
          <Text style={styles.enderecoHomeText}>
            {address.road}, {address.city}
          </Text>
          <View style={{left: 10}}>
            <Icon
              name={'chevron-thin-down'}
              size={17}
              color={COLORS.orangeWarning}
            />
          </View>
        </View>
      ) : (
        <ActivityIndicator />
      )}

      <View style={{padding: 20}}>
        <Search />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  enderecoHome: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  enderecoHomeText: {
    color: COLORS.orangeWarning,
    textDecorationLine: 'underline',
    fontSize: 15,
  },
});
