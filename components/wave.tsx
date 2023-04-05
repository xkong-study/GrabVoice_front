import React from 'react';
import { Svg, Path } from 'react-native-svg';


// @ts-ignore
const Waveform = ({ data, width, height, strokeColor, strokeWidth }) => {
    const pathData = data
        .map((y: any, i: number) => `${i * width / data.length},${y}`)
        .join(' ');

    return (
        <Svg width={width} height={height}>
            <Path
                d={`M0,${height / 2} L${pathData} V${height} H0 Z`}
                fill={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};

export default Waveform;
