import React, { useState, useEffect, useRef } from 'react';
import appleData from './apple.csv';
import './App.css';
import { select, line, axisBottom, scaleLinear, 
  transition, csv, bisector, format, timeFormat, timeParse,
  mouse, extent, scaleTime, axisLeft, area } from 'd3';
import { StockInfo } from './components/logic/stockComponent.js';
import { createShadedArea } from './utils/area.js';
import { setAxisDomains,  addAxisToChart} from './utils/axis.js';
import { maxProfit, maxGains } from './utils/profit.js';
import { parseDate, dateFormatter, formatValue } from './utils/date.js';
import { addLineToChart, addGainLine } from './utils/line.js';
import { margin, width, height } from './utils/svgMeasure.js';

const stock = {symbol: "AAPL", company: "Apple Inc."};



function App() {

  const svgRef = useRef();
  const [ csvData, updateData ] = useState();
  const [ noData, updateDataPull ] = useState(false);
  const [ gains, updateGains ] = useState();

  const drawGainLine = (date, orig) => {
    const svg = select(svgRef.current);
    const x = scaleTime()
          .range([0, width]);
    x.domain([orig[0].date, orig[orig.length - 1].date]);
    svg.selectAll(".gain").remove();
    date.map((item, index) => {
      addGainLine(x, item, index, svg);
    })
  }

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

      let bisectDate = bisector(function(d) { return d.date; }).left;
      let x = scaleTime()
          .range([0, width]);

      let y = scaleLinear()
          .range([height, margin.top]);


      let tooltip = select(".container").append("div")
          .attr("class", "tooltip")
          .style("display", "none");
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

        let focus = svg.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus.append("circle")
            .attr("r", 8);

        let tooltipDate = tooltip.append("div")
            .attr("class", "tooltip-date");

        let tooltipPrice = tooltip.append("div");
        tooltipPrice.append("span")
            .attr("class", "tooltip-title")
            .text("Price: ");

        let tooltipPriceValue = tooltipPrice.append("span")
            .attr("class", "tooltip-price");

        svg.append("rect")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            .on("mouseover", function() { focus.style("display", null); tooltip.style("display", null);  })
            .on("mouseout", function() { focus.style("display", "none"); tooltip.style("display", "none"); })
            .on("mousemove", mousemove);

        function mousemove() {
            let x0 = x.invert(mouse(this)[0]),
                i = bisectDate(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i],
                d = x0 - d0.date > d1.date - x0 ? d1 : d0;
            focus.attr("transform", "translate(" + x(d.date) + "," + y(d.price) + ")");
            tooltip.attr("style", "left:" + (x(d.date) + 70) + "px;top:" + (y(d.price) + 0) + "px;");
            tooltip.select(".tooltip-date").text(dateFormatter(d.date));
            tooltip.select(".tooltip-price").text(formatValue(d.price));
        }
    });
  }


  useEffect(() => {
    buildStockGraph();
  },[]);

  const adjustSelectedItem = (gain) => {
    let gainCopy = JSON.parse(JSON.stringify(gains))
    gainCopy.map((g) => {
      if (g.id === gain.id)
        g.selected = true
      else
        g.selected = false
    })
    updateGains(gainCopy);
  }

  const gainAdjust = (gain) => { 
    adjustSelectedItem(gain);
    drawGainLine([gain.buy.date, gain.sell.date], csvData); 
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
