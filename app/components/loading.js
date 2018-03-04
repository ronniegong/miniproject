
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator
} from 'react-native';


type Props = {};
export default class Loading extends Component<Props> {

    render() {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
});
