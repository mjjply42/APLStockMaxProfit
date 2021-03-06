import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/reset.css';


export const Buy = (props) => {
    const { buy } = props;
    return (
        <>
            <div style={ styles.buyContainer }>
                <p style={ styles.buyPrice }> -{ buy.price } </p>
                <p style={ styles.buy }> BUY </p>
            </div>
            <div style={ styles.dateBuyContainer }>
                <p style={ styles.dateBuy }>{ buy.date }</p>
            </div>
        </>
    )
}

export const Sell = (props) => {
    const { sell } = props;
    return (
        <>
            <div style={ styles.sellContainer }>
                <p style={ styles.sellPrice }> +{ sell.price } </p>
                <p style={ styles.sell }> SELL</p>
            </div>
            <div style={ styles.dateSellContainer }>
                <p style={ styles.dateSell }>{ sell.date }</p>
            </div>
        </>
    )
}

const styles = {
    buyContainer: {
        backgroundColor: 'red',
        width: '100%',
        height: '34px',
        maxHeight: '50%',
        display: 'flex',
    },
    buyPrice: {
        marginTop: '3px',
        width: '50%',
        fontSize: '25px',
        color: 'white',
        marginLeft: '30px',
    },
    buy: {
        marginTop: '3px',
        width: '50%',
        fontSize: '25px',
        color: 'white',
        fontWeight: '300',
    },
    dateBuy: {
        fontSize: '12px',
        color: 'white',
        marginLeft: '30px',
        fontWeight: '200',
    },
    dateBuyContainer: {
        backgroundColor: 'red',
    },
    sellContainer: {
        backgroundColor: 'green',
        height: '34px',
        maxHeight: '50%',
        display: 'flex',
    },
    sellPrice: {
        width: '50%',
        fontSize: '25px',
        color: 'white',
        marginLeft: '30px',
        marginTop: '3px',
    },
    sell: {
        width: '50%',
        marginTop: '3px',
        fontSize: '25px',
        color: 'white',
        fontWeight: '300',
    },
    dateSell: {
        fontSize: '12px',
        backgroundColor: 'green',
        color: 'white',
        marginLeft: '30px',
        fontWeight: '200',
    },
    dateSellContainer: {
        backgroundColor: 'green',
    },
}

Buy.propTypes = {
    buy: PropTypes.object,
};

Sell.propTypes = {
    sell: PropTypes.object,
};