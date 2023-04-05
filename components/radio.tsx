import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { AudioRecorder } from 'react-native-audio';
import { request, PERMISSIONS} from 'react-native-permissions';
import AudioRecord from 'react-native-audio-record';
import { Buffer } from 'buffer';

export default function Radio(this: any) {
    const [granted,setGrant] = useState('');
    useEffect(() => {
        const requestMicrophonePermission = async () => {
            setGrant(await request(PERMISSIONS.IOS.MICROPHONE));
            if (granted === 'granted') {
                console.log('Microphone permission granted');
            } else {
                console.log('Microphone permission denied');
            }
        };
        requestMicrophonePermission();
    }, [granted]);


    const onStartRecord = async () => {
        try {
            await AudioRecorder.requestAuthorization();
            const audioRecordConfig = {
                sampleRate: 44100,
                channels: 1,
                bitsPerSample: 16,
                audioSource: 0,
                wavFile: 'test.wav',
            };

            AudioRecord.init(audioRecordConfig);
            AudioRecord.start();
            AudioRecord.on('data', (data) => {
                console.log(data);
            });

        } catch (error) {
            console.error('voice:'+error);
        }
    };

    const onStopRecord = async () => {
        await AudioRecord.stop();
        console.log('stop')
    };


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onStartRecord} style={styles.button}>
                <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onStopRecord} style={styles.button}>
                <Text style={styles.buttonText}>Stop</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'row'
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#4CAF50',
        borderRadius: 4,
        marginLeft:5
    },
    buttonRecording: {
        backgroundColor: '#F44336',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});
