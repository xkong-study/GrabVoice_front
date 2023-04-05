import {
    Animated,
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar, StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Avatar} from '@rneui/themed';
import {Text} from '@rneui/themed';
import React, {useEffect, useRef, useState} from 'react';
import { Dimensions } from 'react-native';
import myTheme from '../theme';
import LinearGradinet from 'react-native-linear-gradient';
import {NativeBaseProvider } from 'native-base';
import Radio from "../components/radio";


export function HomeScreen() {
    const [isDarkMode,setIsDarkMode] = useState('dark');
    const [icon,setIcon] = useState("moon-o");
    const [fontColor,setFontColor] = useState('black')
    const [borderColor,setBorderColor] = useState('rgba(0,103,243,0.75)')
    const backgroundStyle = {
        backgroundColor: isDarkMode=='dark' ? myTheme.colors.background["50"] : myTheme.colors.background["100"],
    };
    const chunk = ['https://cdn.pixabay.com/photo/2016/05/12/23/03/lamb-1388937__480.png', 'https://cdn.pixabay.com/photo/2018/07/09/17/44/baby-elephant-3526681__480.png',
        'https://cdn.pixabay.com/photo/2013/07/13/01/24/bunny-155674__480.png', 'https://cdn.pixabay.com/photo/2018/05/26/18/06/dog-3431913__480.jpg',
        'https://cdn.pixabay.com/photo/2012/04/02/14/24/bee-24633__480.png','https://cdn.pixabay.com/photo/2019/03/03/08/25/rabbit-4031334__480.png',
        'https://cdn.pixabay.com/photo/2018/02/26/11/13/cat-3182830__480.png','https://cdn.pixabay.com/photo/2018/12/07/10/03/animal-3861398__480.png',
        'https://cdn.pixabay.com/photo/2019/08/19/20/36/pig-4417320__480.jpg','https://cdn.pixabay.com/photo/2022/02/01/20/20/animal-6987017__480.jpg',
        'https://cdn.pixabay.com/photo/2013/07/12/18/20/santa-claus-153309__480.png','https://cdn.pixabay.com/photo/2020/11/27/06/58/cat-5781057__480.jpg',
        'https://i.328888.xyz/2023/03/19/Mrxyv.jpeg','https://cdn.pixabay.com/photo/2018/04/19/21/17/lion-3334357__480.jpg',
        'https://cdn.pixabay.com/photo/2020/10/18/20/43/dinosaur-5666127__480.png','https://cdn.pixabay.com/photo/2016/03/31/23/37/animal-1297724__480.png']

    const [Image,setImage] = useState(chunk[0])
    const widthX = useRef(new Animated.Value(0)).current;
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const animatedValue = useRef(new Animated.Value(0)).current;
    const [rotation] = useState(new Animated.Value(0));
    const progress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(progress, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    useEffect(() => {
        startAnimation();
    }, []);

    const startAnimation = () => {
        Animated.loop(
            Animated.timing(rotation, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        ).start();
    };

    const rotate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const parallelAnimation = Animated.parallel([
        Animated.timing(rotation, {
            toValue: 1,
            duration:2000,
            useNativeDriver: true,
        }),
    ]);
    useEffect(() => {
        widthX.setValue(0);
        animatedValue.setValue(0);
        Animated.timing(widthX, {
            toValue: width,
            duration: 3000,
            useNativeDriver: false,
        }).start();
        Animated.timing(animatedValue, {
            toValue: 2,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [Image, widthX]);

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0,2],
    });
    const animatedScale = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 1],
    });
    const [outputRange,setOutputRange] = useState(['#0bd1ff','#ffd34e'])
// @ts-ignore
   const handleButtonPress=(params) => {
       console.log('Clicked on key:', params);
       // @ts-ignore
       setImage(chunk[params])
   }
   const changeMode=()=>{
       if(isDarkMode=='dark') {
           setIsDarkMode('')
           setIcon("sun-o")
           setFontColor('white')
           setOutputRange(['#5b8686','#cec7b3'])
           setBorderColor('rgba(105,164,248,0.75)')
       }
       else{
           setIsDarkMode('dark')
           setIcon("moon-o")
           setFontColor('black')
           setOutputRange(['#0bd1ff','#ffd34e'])
           setBorderColor('rgba(0,103,243,0.75)')
       }
   }

    const [inputRange, setInputRange] = useState([0, height*0.5]);

    const waveform = widthX.interpolate({
        inputRange,
        outputRange: [0, 10],
    });
        // @ts-ignore
    return (
        <NativeBaseProvider>
        <LinearGradinet
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={backgroundStyle.backgroundColor}
            style={{ width: width, height: height }}
        >
        <SafeAreaView style={{height:'100%'}}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <View style={styles.sectionDescription}>
                <TouchableOpacity onPress={changeMode}>
                <Icon name={icon} size={30} color={fontColor} />
                </TouchableOpacity>
            </View>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic">
                <View>
                    <Text h4 style={{color: fontColor, marginLeft:5}}>Hi kids!</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            margin: '5%',
                        }}
                    >
                        {chunk.map((l, i) => (
                            <TouchableOpacity
                                style={{
                                    marginLeft: '5%',
                                    marginBottom:'2%',
                                }}
                                key={`${i}`}
                                onPress={()=>handleButtonPress(i)}
                            >
                                {
                                    chunk[i]==Image?
                                    <Animated.View style={{...styles.border1, transform: [{rotate}], borderColor: borderColor}}/>:
                                    <Animated.View style={{...styles.border, transform: [{rotate}]}}/>
                                }
                            <Avatar
                                size={60}
                                rounded
                                source={l ? { uri: l } : {}}
                                key={`${i}`}
                            />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                    <Animated.View
                        style={{
                            height:waveform,
                            width: widthX,
                            backgroundColor: widthX.interpolate({
                                inputRange: [0, width],
                                outputRange: outputRange,
                            }),
                        }}
                    >
                    </Animated.View>
                    <Animated.View style={{...styles.imagContainer, transform: [{ scale: animatedScale }]}}>
                    <Avatar
                        size={100}
                        rounded
                        source={{uri:Image.toString()}}
                    />
                    </Animated.View>
                <Radio/>
            </ScrollView>
        </SafeAreaView>
        </LinearGradinet>
        </NativeBaseProvider>
    );
}



const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: '5%',
        paddingHorizontal: '24%',
        justifyContent:"center",
        alignItems: 'center',
        flex: 1,
        position:"absolute"
    },
    imagContainer: {
        marginTop: '20%',
        paddingHorizontal: '24%',
        justifyContent:"center",
        alignItems: 'center',
        flex: 1,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 5,
        position:"relative",
        left:'90%'
    },
    highlight: {
        fontWeight: '700',
    },
    icon: {
        fontSize: 100,
        color: 'black',
        marginHorizontal: 20,
    },
    border:{
        borderColor:'rgba( 255, 255, 255, 0.25 )',
        borderStyle:'solid',
        borderWidth:3,
        borderRadius:50,
        width:68,
        height:68,
        marginBottom:-64,
        marginLeft:-4
    },
    border1:{
        borderStyle:'dashed',
        borderWidth:3,
        borderRadius:50,
        width:68,
        height:68,
        marginBottom:-64,
        marginLeft:-4
    }
});
