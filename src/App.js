import React, { useState, useEffect, useRef } from 'react';
import appleData from './apple.csv';
import './App.css';
import { select, line, axisBottom, scaleLinear, 
  transition, csv, bisector, format, timeFormat, timeParse,
  mouse, extent, scaleTime, axisLeft, area } from 'd3';
  import { StockInfo } from './components/logic/stockComponent.js';

const stock = {symbol: "AAPL", company: "Apple Inc."};



function App() {

  const svgRef = useRef();
  const [ csvData, updateData ] = useState();
  const [ gains, updateGains ] = useState();

  const margin = { top: 30, right: 132, bottom: 30, left: 50 };
  const width = 900;
  const height = 600;

  const drawGainLine = (date, orig) => {
    const svg = select(svgRef.current);
    const parseDate = timeParse("%Y-%m-%e");
    const x = scaleTime()
          .range([0, width]);
    x.domain([orig[0].date, orig[orig.length - 1].date]);
    svg.selectAll(".gain").remove();
    date.map((item, index) => {
      svg.append("line")
      .attr("class", "gain")
      .attr("x1", x(parseDate(item)))
      .attr("y1", 200)
      .attr("x2", x(parseDate(item)))
      .attr("y2", 500)
      .style("stroke-width", 3)
      .style("stroke", (index === 0 ? "red":"green"))
      let path = svg.selectAll('.gain');
      const pathLength = path.node().getTotalLength();
      const transitionPath = transition()
        .duration(500);  
      path
        .attr('stroke-dashoffset', pathLength)
        .attr('stroke-dasharray', pathLength)
        .transition(transitionPath)
        .attr('stroke-dashoffset', 0);;
    })
  }



  useEffect(() => {
    const svg = select(svgRef.current);

    csv(appleData).then((data) => {
      updateData(data)
      let profitObject = maxProfit(data);
      updateGains(maxGains(profitObject, data));
      let parseDate = timeParse("%Y-%m-%e");
      let bisectDate = bisector(function(d) { return d.date; }).left;
      let formatValue = format(",");
      let dateFormatter = timeFormat("%y-%m-%d");

      

    let x = scaleTime()
            .range([0, width]);

    let y = scaleLinear()
            .range([height, margin.top]);

            const xAxis = axisBottom(x)
            .ticks(12)
            .tickFormat(dateFormatter);
          svg.select('.x-axis')
            .call(xAxis);
      
          const yAxis = axisLeft(y)
          .ticks(8)
          svg.select('.y-axis')
            .call(yAxis);

            svg.append("g")			
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")

    let liner = line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.price); });

    var arear = area()
        .x(function(d) { return x(d.date); })
        .y0(height)
        .y1(function(d) { return y(d.price); });

    let tooltip = select(".container").append("div")
        .attr("class", "tooltip")
        .style("display", "none");
        data.forEach(function(d) {
            d.date = parseDate(d.date);
            d.price = +d.price;
        });

        data.sort(function(a, b) {
            return a.date - b.date;
        });
        let dataClone = JSON.parse(JSON.stringify(data));
        dataClone.sort(function(a, b) {
          return a.price - b.price;
      });
        x.domain([data[0].date, data[data.length - 1].date]);
        y.domain(extent(data, function(d, index) { 
          if (d.price === dataClone[0].price)
            return (d.price - 50);
          if (d.price === dataClone[dataClone.length - 1].price)
            return (d.price + 50);
          return (d.price); 
        }));

        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + (height + 5) + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y-axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "translate(0," + width + ")")
            .style("text-anchor", "end")
            .text("Price");

        svg.append("path")
            .datum(data)
            .attr("class", "area")
            .attr("d", arear);

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", liner);

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
      

            const graphArea = svg
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const defs = svg.append('defs');
  const bgGradient = defs
.append('linearGradient')
.attr('id', 'area-gradient')
.attr('gradientTransform', 'rotate(90)');

bgGradient
  .append('stop')
  .attr('stop-color', 'lightblue')
  .attr('offset', '0%');
bgGradient
  .append('stop')
  .attr('stop-color', 'white')
  .attr('offset', '70%');

            let path = select('.line');
            const pathLength = path.node().getTotalLength();
            const transitionPath = transition()
              .duration(1500);
        
            path
              .attr('stroke-dashoffset', pathLength)
              .attr('stroke-dasharray', pathLength)
              .transition(transitionPath)
              .attr('stroke-dashoffset', 0);

            let shaded = select('.area');
            shaded
              .transition()
              .duration(2500)
              .attr("fill-opacity", 1)

        function mousemove() {
            let x0 = x.invert(mouse(this)[0]),
                i = bisectDate(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i],
                d = x0 - d0.date > d1.date - x0 ? d1 : d0;
            focus.attr("transform", "translate(" + x(d.date) + "," + y(d.price) + ")");
            tooltip.attr("style", "left:" + (x(d.date) + 70) + "px;top:" + (y(d.price) + 100) + "px;");
            tooltip.select(".tooltip-date").text(dateFormatter(d.date));
            tooltip.select(".tooltip-price").text(formatValue(d.price));
        }
    });
  },[]);

  const maxProfit = (prices) => {
    let maxProf = [
      {
        id: null,
        start: null, 
        end: null, 
        profit: null
      }
    ];
    for (let i = 0; i < prices.length - 1; i++) {
        for (let j = i + 1; j < prices.length; j++) {
            let profit = prices[j].price - prices[i].price;
            if (profit > maxProf[0].profit)
            {
              if (maxProf[0].profit === null)
              {
                maxProf[0].start =  i;
                maxProf[0].end =  j; 
                maxProf[0].profit = profit;
                maxProf[0].id = 0;
              }
                maxProf = [];
                maxProf.push({start: i, end: j, profit: profit});
            }
            else if (profit === maxProf[0].profit)
              maxProf.push({start: i, end: j, profit: profit});
        }
    }
    return (maxProf);
  };

  const maxGains = (profits, data) => {
    let gains = [];
    profits.map((item, index) => {
      gains.push({
        id: index,
        buy: {date: data[item.start].date, price: data[item.start].price},
        sell: {date: data[item.end].date, price: data[item.end].price},
        profit: item.profit,
        ideal: false,
        selected: false
      })
    })
    return (gains);
  }

  const adjustSelectedItem = (gain) => {
    let gainCopy = JSON.parse(JSON.stringify(gains))
    console.log("GAIN: ", gainCopy)
    gainCopy.map((g) => {
      if (g.id === gain.id)
        g.selected = true
      else
        g.selected = false
    })
    updateGains(gainCopy);
  }

  const gainAdjust = (gain) => { 
    adjustSelectedItem(gain)
    drawGainLine([gain.buy.date, gain.sell.date], csvData); 
  };

  return (
        <div className='container' style={styles.appContainer}>
          <svg width='900' height='600' style={styles.chartContainer} ref={ svgRef }>
          </svg>
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
  }
}

export default App;
