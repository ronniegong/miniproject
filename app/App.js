import {
    StackNavigator,
} from 'react-navigation';
import React, { Component } from 'react';

import HomeScreen from './pages/home'
import ActiveScreen from './pages/active'
const Stack = StackNavigator({
    Home: { screen: HomeScreen },
    Active: { screen: ActiveScreen },
},{
    headerMode: "none"
});
export default class App extends Component<Props> {
    render() {
        return <Stack/>
    }
}