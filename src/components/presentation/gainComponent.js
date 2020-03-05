import React from 'react';
import { Buy, Sell } from './stockAction.js';
import PropTypes from 'prop-types';

export const GainBlock = (props) => {
    const { gain, optimal } = props;
    return (
        <>
        <div onClick={()=>{props.passGain(gain)}} style={{boxShadow: (!gain.selected ? ('-5px 6px 15px #888888') : ('0px 0px 15px 10px steelblue')),
                width: '100%',
                minHeight: '50px',
                display: 'flex',
                marginBottom: '40px',
                cursor: 'pointer',
                backgroundColor: (optimal ?((gain.id === optimal.id) ? '#FFCE40': undefined):undefined),}}>
            <div style={ styles.profitDiv }>
                <h1 style={{minWidth: '110px',
                        fontSize: '35px',
                        color: (optimal ?((gain.id === optimal.id) ? 'white': 'green'):'green'),
                        gridArea: 'profit',
                        textAlign: 'center',
                        fontWeight: (optimal ?((gain.id === optimal.id) ? '500': '300'):'300'),}}> +{ gain.profit } </h1>
            </div>
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
        minWidth: '110px',
        fontSize: '35px',
        color: 'green',
        gridArea: 'profit',
        textAlign: 'center',
    },
    buySell: {
        width: '100%',
        height: '100%',
        minHeight: '20px',
        gridArea: 'info',
    },
    profitDiv: {
        width: '200px',
    },
}

GainBlock.propTypes = {
    key: PropTypes.number,
    gain: PropTypes.object,
    optimal: PropTypes.object,
    passGain: PropTypes.func,
};