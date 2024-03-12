import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getLogin} from '../../repository/Login.repository';

const PrimeiraTela = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    carregaDados();
  }, []);

  const carregaDados = () => {
    setLoading(true);

    validaSeJaTemLogin();
    setLoading(false);
  };

  const validaSeJaTemLogin = async () => {
    const userData = await getLogin();

    const token = userData.id;

    if (token) {
      navigation.navigate('Main');
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Text>primeiraTela</Text>
      <ActivityIndicator />
    </View>
  );
};

export default PrimeiraTela;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
