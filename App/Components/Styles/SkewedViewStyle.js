import { StyleSheet } from 'react-native';
import Colors from '../../Themes/Colors';
import Metrics from '../../Themes/Metrics';

const styles = (
  degree,
  height = Metrics.screenHeight / 2 + 24,
  weight = Metrics.screenWidth
) => {
  const skewWidth =
    weight / Math.cos(degree * (Math.PI / 180)) +
    Math.tan(degree * (Math.PI / 180)) * height;
  const verticalOffset =
    (Math.sin(degree * (Math.PI / 180)) / 2) *
    (skewWidth - Math.tan(degree * (Math.PI / 180)) * height);

  return StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: Colors.alert,
      alignItems: 'center',
    },
    top: {
      backgroundColor: Colors.secondary,
      transform: [{ rotate: `${degree}deg` }],
      paddingHorizontal: 0,
      paddingTop: 24,
      marginTop: -verticalOffset,
      width: skewWidth,
      height: height,
      zIndex: 8,
    },
    bottom: {
      justifyContent: 'center',
      height: height,
    },
    skewInner: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      transform: [{ rotate: `-${degree}deg` }],
    },
  });
};

export default styles;
