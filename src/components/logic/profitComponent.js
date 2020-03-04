import React, { useState, useEffect, useRef } from 'react';
import { GainBlock } from '../presentation/gainComponent.js';

export const ProfitPeriod = (props) => {
    const gains = [
        {
            buy: { date: '2018/08/23', price: 134}, 
            sell: { date: '2018/08/30', price: 334}, 
            profit: 234
        },
        {
            buy: { date: '2017/03/23', price: 24}, 
            sell: { date: '2017/06/30', price: 123}, 
            profit: 99,
        },
        {
            buy: { date: '2017/03/23', price: 24}, 
            sell: { date: '2017/06/30', price: 123}, 
            profit: 99,
        },
        {
            buy: { date: '2017/03/23', price: 24}, 
            sell: { date: '2017/06/30', price: 123}, 
            profit: 99,
        },
        {
            buy: { date: '2017/03/23', price: 24}, 
            sell: { date: '2017/06/30', price: 123}, 
            profit: 99,
        },
        {
            buy: { date: '2017/03/23', price: 24}, 
            sell: { date: '2017/06/30', price: 123}, 
            profit: 99,
        },
        {
            buy: { date: '2017/03/23', price: 24}, 
            sell: { date: '2017/06/30', price: 123}, 
            profit: 99,
        }
    ];

    return (
        <>
        <div style={styles.profitPeriodContainer}>
            <div style={styles.gainContainer}>
            {gains.map((gain, index) => {
                return (
                    <GainBlock gain={ gain }/>
                )
            })}
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
    },
    gainContainer: {
        //backgroundColor: 'purple',
        width: '90%',
        minHeight: '200px',
        maxHeight: '365px',
        gridArea: 'container', 
    }
}