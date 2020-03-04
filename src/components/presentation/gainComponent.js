import React from 'react';
import { Buy, Sell } from './stockAction.js';

export const GainBlock = (props) => {
    const { gain } = props
    return (
        <>
        <div style={ styles.gainContainer }>
            <h1 style={ styles.profit }> +{ gain.profit } </h1>
            <div style={ styles.buySell }>
                <Buy buy={ gain.buy }/>
                <Sell sell={ gain.sell }/>
            </div>
        </div>
        </>
    )
}

const styles = {
    gainContainer: {
        boxShadow: '-5px 6px 15px #888888',
        backgroundColor: 'white',
        width: '100%',
        minHeight: '50px',
        display: 'flex',
        marginBottom: '40px',
        cursor: 'pointer',
    },
    profit: {
        minWidth: '80px',
        fontSize: '35px',
        color: 'green',
        gridArea: 'profit',
        marginLeft: '20px',
        marginRight: '24px',
    },
    buySell: {
        backgroundColor: 'orange',
        width: '100%',
        height: '100%',
        minHeight: '20px',
        gridArea: 'info',
    }
}