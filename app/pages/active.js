
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    AsyncStorage,
    ScrollView,
    Dimensions,
} from 'react-native';
import Header from 'components/header'
import Loading from 'components/loading'
import imageLoading from 'images/loading.gif'
import {getActivesFromUrl} from 'util/request'
import Sound from 'react-native-sound';
// Enable playback in silence mode
const windowWidth = Dimensions.get("window").width;
Sound.setCategory('Playback');

type Props = {};
export default class Home extends Component<Props> {

    state={
        loading:true,
        actives:[],
        duration:0,
        current:0
    }

    componentDidMount(){

        AsyncStorage.getItem('actives').then(resp=>{
            if(resp){
                this.setState({
                    actives:JSON.parse(resp),
                    loading:false
                })
            }

            getActivesFromUrl().then(data=>{
                let arr = data['get_active']
                if(JSON.stringify(arr) !== resp){
                    this.setState({
                        actives:arr,
                        loading:false
                    })
                    AsyncStorage.setItem('actives',JSON.stringify(arr))
                }
            }).catch(error=>{
                console.log(error)
            })

        })

        this.playSong()
    }

    componentWillUnmount(){
        this.player && this.player.stop()
        this.player && this.player.release();
        this.timerId && clearTimeout(this.timerId)

    }

    playSong(){
        let url = 'https://raw.githubusercontent.com/ronniegong/miniproject/master/song.mp3'
        var player = new Sound(url, undefined, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            // loaded successfully
            let duration = player.getDuration();
            console.log('duration in seconds: ' + duration);
            this.setState({
                duration:duration.toFixed(2)
            })
           // player.setNumberOfLoops(9999);
            player.play()
            this.getCurrentTime(player,duration)

        });


        this.player = player
    }

    getCurrentTime(player,duration){
        this.timerId = setTimeout(() => {
            player.getCurrentTime((seconds) => {
                console.log('at ' + seconds);
                if(seconds < duration && seconds > 0){
                    this.setState({
                        current:seconds.toFixed(2)
                    })
                    this.getCurrentTime(player,duration)
                }else{
                    this.setState({
                        current:duration.toFixed(2)
                    })
                }
            });
        }, 500);
    }

    render() {
        return (
            <View style={styles.container}>
                <Header title={'Get Active'} navigator={this.props.navigation}/>
                {
                    this.state.loading ?
                        <Loading/>
                        :
                        <ScrollView>
                            {
                                this.state.actives.map((active)=>{
                                   return this.renderActive(active)
                                })
                            }
                        </ScrollView>
                }
                <View style={styles.player}>
                    <Text style={{color:'#fff'}}>{`音乐播放进度(秒数):${this.state.current}/${this.state.duration}`}</Text>
                </View>

            </View>
        );
    }

    renderActive(active){
        return (
            <View style={styles.active} key={active.name}>
                <Image
                    source={{uri:`https:${active.image.url}`}}
                    style={styles.image}
                    resizeMode={'contain'}
                    loadingIndicatorSource={imageLoading}
                />
                <Text style={styles.name}>{active.name}</Text>
                {
                    active.instruction && <Text style={styles.desc}>{active.instruction}</Text>
                }
                {
                    active.steps && active.steps.length > 0 && active.steps.map((step,index)=>{
                        return (
                            <View key={index} style={styles.step}>
                                <Text  style={styles.stepIndex}>{`STEP ${index}`}</Text>
                                <Text  style={[styles.desc,{marginVertical:20}]}>{step}</Text>
                            </View>
                        )
                    })
                }
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
    },
    active:{
      padding:20,
      justifyContent:'center',
      alignItems:'center'
    },
    image:{
        width:140,
        height:140,
        borderRadius:70,
    },
    name:{
        fontSize:20,
        textAlign:'center',
        marginVertical:20
    },
    desc:{
        lineHeight:25,
        color:'#333',
    },
    stepIndex:{
        color:'#43BCD3'
    },
    step:{
        alignItems:'center'
    },
    player:{
        position:'absolute',
        bottom:0,
        height:40,
        opacity:0.5,
        backgroundColor:'#000',
        alignItems:'center',
        justifyContent:'center',
        width:windowWidth
    }
});
