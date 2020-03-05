import React, { useState, useEffect, useRef } from 'react';
import appleData from './apple.csv';
import './App.css';
import { select, scaleLinear, csv, scaleTime } from 'd3';
import { StockInfo } from './components/logic/stockComponent.js';
import { createShadedArea } from './utils/area.js';
import { setAxisDomains,  addAxisToChart} from './utils/axis.js';
import { maxProfit, maxGains } from './utils/profit.js';
import { parseDate } from './utils/date.js';
import { addLineToChart, drawGainLine } from './utils/line.js';
import { createTooltip } from './utils/tooltip.js';
import { margin, width, height } from './utils/svgMeasure.js';

const stock = {symbol: "AAPL", company: "Apple Inc."};

function App() {

  const svgRef = useRef();
  const [ csvData, updateData ] = useState();
  const [ noData, updateDataPull ] = useState(false);
  const [ gains, updateGains ] = useState();

  const buildStockGraph = () => {
    const svg = select(svgRef.current);
    csv(appleData).then((data) => {
      if (data.length < 1)
      {
        updateDataPull(true);
        return;
      }

      updateData(data)
      let profitObject = maxProfit(data);
      if (profitObject[0].id !== null)
        updateGains(maxGains(profitObject, data));
      let x = scaleTime()
          .range([0, width]);

      let y = scaleLinear()
          .range([height, margin.top]);
          data.forEach(function(d) {
            d.date = parseDate(d.date);
            d.price = +d.price;
          });

          data.sort(function(a, b) {
            return a.date - b.date;
        } );
      setAxisDomains(x, y, data);
      addAxisToChart(x, y, svg);
      createShadedArea(x, y, data, svg);
      addLineToChart(x, y, data, svg);
      createTooltip(x, y, data, svg);
    });
  }

  useEffect(() => {
    buildStockGraph();
  },[]);


  const adjustSelectedItem = (gain) => {
    let gainCopy = JSON.parse(JSON.stringify(gains))
    gainCopy.forEach((g) => {
      if (g.id === gain.id)
        g.selected = true
      else
        g.selected = false
    })
    updateGains(gainCopy);
  }

  const gainAdjust = (gain) => { 
    adjustSelectedItem(gain);
    drawGainLine([gain.buy.date, gain.sell.date], csvData, select(svgRef.current)); 
  };

  return (
        <div className='container' style={ styles.appContainer} >
          {!noData && <svg width='900' height='600' style={ styles.chartContainer } ref={ svgRef }>
          </svg>}
          {noData && <div style={ styles.chartContainer }>
            <div style={ styles.emptyContainer}>
              <h1 style={ styles.noData }>No Data Available</h1>
            </div>
          </div>}
          <StockInfo stock={ stock } data={ gains } passGain={ gainAdjust }/>
        </div>
  );
}

const styles = {
  appContainer: {
    width: window.innerWidth,
    height: (window.innerHeight - 100),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartContainer: {
    borderRadius: '10px',
    boxShadow: '-5px 6px 15px #888888',
    overflow: 'visible',
    marginLeft: '26px',
    marginRight: '20px',
    marginTop: '70px',
    width: '900px',
    height: '600px',
  },
  emptyContainer: {
    wdith: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noData: {
    fontSize: '60px',
    color: '#939393',
    fontWeight: '200',
  }
}

export default App;