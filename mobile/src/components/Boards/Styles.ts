import { StyleSheet } from 'react-native';

export const DOT_SIZE = 10;
export const DOT_MARGIN = 14;
export const BAR_WIDTH = DOT_SIZE + DOT_MARGIN;

export default StyleSheet.create({
	container: {
		position: 'absolute',
		left: 0,
		top: 0,
		right: 0,
		flexDirection: 'row',
		flexWrap: 'nowrap',
		justifyContent: 'center',
		zIndex: 100,
	},
	dotsContainer: {
		position: 'relative',
		flexDirection: 'row',
		flexWrap: 'nowrap',
		justifyContent: 'center'
	},
	dot: {
		backgroundColor: '#000',
		borderRadius: DOT_SIZE,
		height: DOT_SIZE,
		width: DOT_SIZE,
		opacity: 0.5
	},
	bar: {
		backgroundColor: '#000',
		borderRadius: DOT_SIZE,
		height: DOT_SIZE,
		opacity: 1,
		position: 'absolute',
		bottom: 0,
		marginLeft: DOT_SIZE / 2
	},
	indicator: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		backgroundColor: 'red',
		height: 3,
	}
});