import React, { useState, useEffect, useRef } from 'react';
import { GainBlock } from '../presentation/gainComponent.js';

export const ProfitPeriod = (props) => {
    const { data, optimal } = props;
    console.log("HHHH: ", optimal)
    return (
        <>
        <div style={styles.profitPeriodContainer}>
            <div style={styles.gainContainer}>
            {data ? data.map((gain, index) => {
                return (
                    <GainBlock key={ index } gain={ gain } passGain={ props.passGain } optimal={ optimal }/>
                )
            }) : undefined }
            </div>
        </div>
        </>
    )
};

const styles = {
    profitPeriodContainer: {
        marginTop: '30px',
        //backgroundColor: 'pink',
        width: '100%',
        minHeight: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflowY: 'scroll',
        paddingTop: '25px',
    },
    gainContainer: {
        //backgroundColor: 'purple',
        width: '90%',
        minHeight: '200px',
        maxHeight: '365px',
        gridArea: 'container', 
    }
}