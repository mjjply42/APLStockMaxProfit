import React, { useState, useEffect, useRef } from 'react';

export const Optimal = (props) => {
    const { optimal } = props;
    return (
        <>
            <div style={styles.mainContainer}>
            <p style={ styles.title }>Optimal Profit Range</p>
                <div style={ styles.sellContainer }>
                    <span style={ styles.upArrow }></span>
                    <p style={ styles.optimalSellPrice }>{ optimal.sell.price }</p>
                </div>
                <div style={ styles.buyContainer }>
                    <span style={ styles.downArrow }></span>
                    <p style={ styles.optimalBuyPrice }>{ optimal.buy.price }</p>
                </div>
                <div style={ styles.optimalDates }>
                    <p style={ styles.date }>{ optimal.buy.date } - { optimal.sell.date }</p>
                </div>
            </div>
        </>
    )
};

export const NotAvailable = () => {
    return (
        <>
            <>
            <div style={styles.mainContainer}>
            <p style={ styles.title }>Optimal Profit Range</p>
                <div style={ styles.sellContainer }>
                    <span style={ styles.upArrow }></span>
                    <p style={ styles.optimalSellPrice }>N/A</p>
                </div>
                <div style={ styles.buyContainer }>
                    <span style={ styles.downArrow }></span>
                    <p style={ styles.optimalBuyPrice }>N/A</p>
                </div>
                <div style={ styles.optimalDates }>
                    <p style={ styles.date }>N/A</p>
                </div>
            </div>
        </>
        </>
    )
};

const styles = {
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '36px',
        //backgroundColor: 'pink'
    },
    optimalSellPrice: {
        fontSize: '20px',
        color: 'green',
    },
    optimalBuyPrice: {
        fontSize: '20px',
        color: 'red',
    },
    sellContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '45%',
    },
    buyContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '45%',
    },
    upArrow: {
        display: 'inline-block',
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderBottom: '10px solid green',
        marginRight: '10px',
    },
    downArrow: {
        display: 'inline-block',
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderTop: '10px solid red',
        marginRight: '10px',
    },
    optimalDates: {
        marginTop: '38px',
        //backgroundColor: 'orange',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    date: {
        marginTop: '-58px',
        fontSize: '16px',
        color: '#939393',
        fontWeight: '200',
    },
    title: {
        fontSize: '14px',
        textAlign: 'center',
        color: '#939393',
        fontWeight: '300',
    },
}