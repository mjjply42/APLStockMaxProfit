import React from 'react';
import PropTypes from 'prop-types';
import { GainBlock } from '../presentation/gainComponent.js';

export const ProfitPeriod = (props) => {
    const { data, optimal } = props;
    return (
        <>
        <div style={ styles.profitPeriodContainer }>
            <div style={ styles.gainContainer }>
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
        width: '100%',
        minHeight: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflowY: 'scroll',
        paddingTop: '25px',
    },
    gainContainer: {
        width: '90%',
        minHeight: '200px',
        maxHeight: '365px',
        gridArea: 'container', 
    }
}

ProfitPeriod.propTypes = {
    data: PropTypes.array,
    optimal: PropTypes.object,
    passGain: PropTypes.func,
};