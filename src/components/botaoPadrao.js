import React from 'react';
import {Pressable, Text, ActivityIndicator, StyleSheet} from 'react-native';
import COLORS from './COLOR';

const BotaoPadrao = props => {
  const backgroundColor = props.desabilitado ? COLORS.baseE6 : props.color;
  const height = props.botaoGrande ? 40 : 32;
  const fontSize = props.botaoGrande ? 15 : 12;
  const lineHeight = props.botaoGrande ? 15 : 12;

  let cliqued = false;

  const onPress = () => {
    if (!cliqued) {
      cliqued = true;
      props.onPress && props.onPress();
      setTimeout(() => (cliqued = false), 1000);
    }
  };

  return (
    <Pressable
      //style={[styles.container, props.style, {height, backgroundColor}]}
      style={{
        ...styles.container,
        ...{height, backgroundColor},
        ...props.style,
      }}
      disabled={props.desabilitado}
      onPress={onPress}>
      {props.onLoading ? (
        <ActivityIndicator
          animating={props.onLoading}
          color={props.colorLoading}
        />
      ) : (
        <Text
          style={{
            ...styles.texto,
            ...{fontSize, lineHeight},
            ...props.textoStyle,
          }}>
          {props.texto}
        </Text>
      )}
    </Pressable>
  );
};

export default BotaoPadrao;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  texto: {
    fontWeight: 'bold',
    color: COLORS.white,
  },
});
