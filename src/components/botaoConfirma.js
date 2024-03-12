import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import COLORS from './COLOR';

const Botao = ({onPress, texto, corFundo, corTexto}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {
          backgroundColor: pressed
            ? 'rgba(0, 0, 0, 0.1)'
            : corFundo || COLORS.orangeWarning,
        },
        styles.botao,
      ]}>
      <Text style={[styles.textoBotao, {color: corTexto || 'white'}]}>
        {texto}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  botao: {
    width: '75%',
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 56,
    marginTop: 80,
  },
  textoBotao: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Botao;
