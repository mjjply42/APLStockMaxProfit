import React, { useState, useEffect, useRef } from 'react';
import { timeParse } from 'd3';
import { ProfitPeriod } from './profitComponent.js';
import { NotAvailable, Optimal } from '../presentation/optimalComponent.js';

export const StockInfo = (props) => {
    const { stock, data } = props;
    const [ optimalProfit, updateOptimalProfit ] = useState();
    const parseDate = timeParse("%Y-%m-%e");

    const opptimalProfitRange = () => {
        let rangeId = null;
        data.map((item, index) => {
            if (index === 0)
                rangeId = 0;
            else
                if (rangeId > (Math.abs((parseDate(item.buy.date)).getTime() - (parseDate(item.sell.date)).getTime())))
                    rangeId = item.id;
        })
        updateOptimalProfit(data[rangeId]);
    }
    
    useEffect(() => {
        if (data)
            opptimalProfitRange()
    },[data]);

    return (
        <>
        <div style={styles.stockContainer}>
            <div style={ styles.stockInfo }>
                <div style={ styles.stockNameDiv }>
                    <h1 style={ styles.symbol }>{ stock.symbol }</h1>
                    <p style={ styles.companyName }>{ stock.company }</p>
                    <hr style={ styles.nameLineBreak }></hr>
                </div>
                <div style={ styles.optimalDiv }>
                    {!optimalProfit ? <NotAvailable/> : <Optimal optimal={ optimalProfit }/>}
                </div>
            </div>
            <ProfitPeriod data={ data } passGain={ props.passGain } optimal={ optimalProfit }/>
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
    stockInfo: {
        //backgroundColor: 'red',
        display: 'flex'
    },
    stockNameDiv: {
        //backgroundColor: 'orange',
        width: '55%',
    },
    optimalDiv: {
        //backgroundColor: 'purple',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '45%',
    },
    symbol: {
        fontSize: '60px',
        marginLeft: '20px',
    },
    companyName: {
        fontSize: '20px',
        marginTop: '-40px',
        marginLeft: '20px',
        color: '#939393',
    },
    nameLineBreak :{
        color: 'black',
        width: '90%',
        align: 'left',
        marginTop: '30px',
    },
}