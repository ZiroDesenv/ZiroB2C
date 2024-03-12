import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import COLORS from './COLOR';

const BotaoNeutro = props => {
  const height = props.botaoGrande ? 40 : 32;
  const fontSize = props.botaoGrande ? 15 : 12;
  const lineHeight = props.botaoGrande ? 15 : 12;

  return (
    <Pressable
      style={{...styles.container, ...{height}, ...props.style}}
      onPress={props.onPress}>
      <Text style={[styles.texto, props.textoStyle, {fontSize, lineHeight}]}>
        {props.texto}
      </Text>
    </Pressable>
  );
};

export default BotaoNeutro;

const styles = StyleSheet.create({
  container: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: COLORS.orangeWarning,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  texto: {
    color: COLORS.orangeWarning,
    fontWeight: 'bold',
  },
});
