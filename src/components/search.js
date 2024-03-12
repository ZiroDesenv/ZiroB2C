import React from 'react';
import {View, TextInput, StyleSheet, Pressable} from 'react-native';
import COLORS from './COLOR';
import Icon from 'react-native-vector-icons/AntDesign';

const Search = props => {
  return (
    <View style={[styles.search, props.style]}>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar"
        placeholderTextColor={COLORS.orangeWarning}
        onChangeText={props.onChangeText}
        value={props.value}
      />
      <Pressable onPress={() => props.onPesquisar && props.onPesquisar()}>
        <Icon name={'search1'} size={17} color={COLORS.orangeWarning} />
      </Pressable>
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
    backgroundColor: COLORS.baseEC,
  },
  searchInput: {
    // ...FONTS.regular,
    color: COLORS.orangeWarning,
    flex: 1,
    padding: 0,
    fontSize: 12,
    lineHeight: 12,
  },
});

export default Search;
