import {StyleSheet} from 'react-native';
import {SIZES} from '../../Constants/Screens/Screens';
import {Fonts} from '../../Constants/Fonts';
import {COLORS} from '../../Constants/COLORS';

const Styles = StyleSheet.create({
  sep: {
    margin: 5,
  },
  selText: {
    color: COLORS.white,
    fontFamily: Fonts.medium,
  },
  unSelText: {
    color: COLORS.black,
    fontSize: SIZES.fullWidth * 0.04,
  },
  selBtn: {
    backgroundColor: COLORS.black,
    borderRadius: 50,
  },
  innerBtn: {
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',
    height: SIZES.fullHeight * 0.055,
    overflow: 'hidden',
  },
  btnView: {
    backgroundColor: COLORS.white,
    width: SIZES.fullWidth * 0.9,
    alignSelf: 'center',
    borderRadius: 50,
    paddingVertical: 5,
  },
  see: {
    fontFamily: Fonts.bold,
    fontSize: SIZES.fullWidth * 0.045,
  },
  friendsText: {
    fontSize: SIZES.fullWidth * 0.05,
    fontFamily: Fonts.bold,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: SIZES.fullWidth * 0.03,
    marginVertical: 15,
  },
});

export default Styles;
