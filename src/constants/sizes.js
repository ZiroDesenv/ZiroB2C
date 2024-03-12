import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const SIZES = {
  headerHeight: 50,

  // app dimensions
  width,
  height,
};

export default SIZES;
