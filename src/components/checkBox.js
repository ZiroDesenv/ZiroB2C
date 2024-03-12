import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from './COLOR';

const CheckBox = ({textoCheckBox, onPressCheckBox, clicouCheckBox}) => {
  return (
    <View style={styles.checkboxContainer}>
      <Pressable onPress={onPressCheckBox}>
        <View
          style={[styles.checkbox, clicouCheckBox && styles.marcouCheckBox]}>
          {/* {clicouCheckBox && <Icon name="check" size={20} color="blue" />} */}
        </View>
      </Pressable>
      <Text style={styles.checkBoxTexto}>{textoCheckBox}</Text>
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: COLORS.orangeWarning,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  marcouCheckBox: {
    backgroundColor: COLORS.orangeWarning,
  },
  checkBoxTexto: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});
