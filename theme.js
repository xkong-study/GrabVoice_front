import React from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';

const myTheme = extendTheme({
    colors: {
        background: {
            50: ['#b883ea', '#e59bad'],
            100: ['#565555','#989797'],
        },
    },
});

export default myTheme;
