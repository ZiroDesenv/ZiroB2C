import React from 'react';
import {View, TextInput, StyleSheet, Pressable} from 'react-native';
import COLORS from './COLOR';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const InformaInfos = props => {
  return (
    <View style={[styles.search, props.style]}>
      <TextInput
        style={styles.searchInput}
        placeholder={props.placeholder}
        placeholderTextColor={COLORS.orangeWarning}
        onChangeText={props.onChangeText}
        secureTextEntry={props.senha}
        keyboardType={props.keyboardType}
        value={props.value}
      />
      <Pressable onPress={() => props.clicouNoIcone && props.clicouNoIcone()}>
        {props.icon && (
          <Icon name={props.icon} size={25} color={COLORS.orangeWarning} />
        )}
      </Pressable>
      {props.iconeSimples && (
        <Pressable onPress={() => props.clicouNoIcone && props.clicouNoIcone()}>
          <SimpleLineIcons
            name={props.iconeSimples}
            size={25}
            color={COLORS.orangeWarning}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    borderRadius: 50,
    paddingLeft: 20,
    paddingRight: 16,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    backgroundColor: COLORS.baseEC,
  },
  searchInput: {
    // ...FONTS.regular,
    color: COLORS.orangeWarning,
    flex: 1,
    padding: 0,
    fontSize: 15,
    lineHeight: 12,
  },
});

export default InformaInfos;
