/**
 * 用于兼容iOS头部状态栏高度
 */
import React, { PureComponent } from "react";
import { StyleSheet, Platform, View,TouchableWithoutFeedback,Text,Image } from "react-native";
import Arrow from 'images/arrow-left.png'

export const statusBarHeight = Platform.select({
  ios: 20,
  android: 0
});
export const headerHeight = statusBarHeight + 44;

export default class Header extends PureComponent {
    setNativeProps(props) {
        this.ref.setNativeProps(props);
    }

    setRef = comp => {
        this.ref = comp;
    };

    render() {
        const {title,navigator}=this.props
        return (
            <View
                ref={this.setRef}
                {...this.props}
                style={[
                    styles.header,
                    this.props.style
                ]}
            >
                <TouchableWithoutFeedback
                    onPress={() => navigator.goBack()}
                >
                    <View style={styles.leftIcon}>
                        <Image
                            source={ Arrow}
                            style={{width:20,height:20}}
                        />
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.title}>
                    <Text style={styles.t}>
                        {title}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  header: {
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: statusBarHeight,
    height: headerHeight,
    backgroundColor:'#FFE4D3'
  },
    leftIcon: {
        marginLeft: 2,
        padding: 10
    },
    title: {
        position: "absolute",
        left: 50,
        right: 50,
        top: statusBarHeight,
        bottom: 0,
        alignItems: "stretch",
        justifyContent: "center"
    },
    t: {
        textAlign: "center"
    }
});
