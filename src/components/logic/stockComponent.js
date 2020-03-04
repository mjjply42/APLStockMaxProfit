import React, { useState, useEffect, useRef } from 'react';
import { ProfitPeriod } from './profitComponent.js';

export const StockInfo = (props) => {
    const { stock, data } = props
    return (
        <>
        <div style={styles.stockContainer}>
            <div style={ styles.stockNameDiv }>
                <h1 style={ styles.symbol }>{ stock.symbol }</h1>
                <p style={ styles.companyName }>{ stock.company }</p>
                <hr style={ styles.nameLineBreak }></hr>
                <ProfitPeriod data={ data }/>
            </div>
        </div>
        </>
    )
};

const styles = {
    stockContainer: {
        //backgroundColor: 'red',
        borderRadius: '10px',
        boxShadow: '-5px 6px 15px #888888',
        height: '600px',
        width: '450px',
        marginTop: '70px',
    },
    stockNameDiv: {
        //backgroundColor: 'orange',
        width: '100%',
    },
    symbol: {
        fontSize: '60px',
        marginLeft: '20px',
    },
    companyName: {
        fontSize: '20px',
        marginTop: '-40px',
        marginLeft: '20px',
    },
    nameLineBreak :{
        color: 'black',
        width: '90%',
        align: 'left',
        marginTop: '30px',
    },
}