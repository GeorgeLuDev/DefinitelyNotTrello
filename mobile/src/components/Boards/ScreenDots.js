import React, { Component } from 'react';
import { View, SafeAreaView, Animated } from 'react-native';
import { NavigationState } from 'react-navigation';
import { SceneRendererProps } from 'react-native-tab-view';

import Styles, { DOT_SIZE, DOT_MARGIN, BAR_WIDTH } from './styles';

const ScreenDotsProps = SceneRendererProps & {
	state: NavigationState
};

const ScreenDotsState = {
	barWidth: Animated.AnimatedInterpolation,
	barPosition: Animated.AnimatedSubtraction,
}

export default class ScreenDots extends Component {

	constructor(props) {
		super(props);

		const barWidth = this.getBarWithInterpolation();

		this.state = {
			barWidth,
			barPosition: this.getBarPositionInterpolation(barWidth)
		};
	}

	render() {
		const { routes } = this.props.navigation.state;
		const { barWidth, barPosition } = this.state;

		return (
			<SafeAreaView style={Styles.container}>
				<View style = {Styles.dotsContainer}>
					{routes.map((route, index) => (
						<View key={route.key} style={[ 
							Styles.dot,
							index === 0 ? null : { marginLeft: DOT_MARGIN }
						]} />
					))}
					<Animated.View style = {[
						Styles.bar,
						{ 
							width: barWidth,
							left: barPosition
						}
					]}/>
				</View>
			</SafeAreaView>
		)
	}

	getBarWithInterpolation() {
		const { position, navigation } = this.props;
		const { routes } = navigation.state;

		const indexPhase = [0.3, 0.7, 1];
		const widthPhase = [BAR_WIDTH, BAR_WIDTH, DOT_SIZE];

		const routeIndexes = routes.reduce(
			(indexes, _, index) => indexes.concat(indexPhase.map(i => index + i)),
			[0]
		);

		return position.interpolate({
			inputRange: routeIndexes,
			outputRange: routes.reduce(phases => phases.concat(widthPhase), [DOT_SIZE]),
			extrapolate: 'clamp'
		});
	}

	getBarPositionInterpolation(widthInterpolation) {
		const { position, navigation } = this.props;
		const { routes } = navigation.state;

		const routeIndexes = routes.map((_, index) => index);

		return Animated.subtract(
			position.interpolate({
				inputRange: routeIndexes,
				outputRange: routes.map((_, index) => (DOT_SIZE + DOT_MARGIN) * index),
				extrapolate: 'clamp'
			}),
			Animated.divide(widthInterpolation, 2)
		);
	}
}