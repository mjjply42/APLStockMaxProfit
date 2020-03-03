import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { select, line, axisBottom, axisRight, scaleLinear, transition } from 'd3';

const data = [25, 30, 45, 60, 29, 45, 90, 134];



function App() {

  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    const xScale = scaleLinear()
      .domain([0, (data.length - 1)])
      .range([0 ,400]);
    const yScale = scaleLinear()
      .domain([0, 150])
      .range([300, 0]);
    const xAxis = axisBottom(xScale)
      .ticks(data.length - 1)
      .tickFormat(index => index + 1);
    svg.select('.x-axis')
      .style('transform', 'translateY(302px')
      .call(xAxis);

    const yAxis = axisRight(yScale);
    svg.select('.y-axis')
      .style('transform', 'translateX(400px')
      .call(yAxis);

    const myLine = line()
      .x((value, index) => xScale(index))
      .y(yScale);


    svg
      .selectAll('.line')
      .data([data])
      .join('path')
      .attr('class', 'line')
      .attr('d', myLine)
      .attr('fill', 'none')
      .attr('stroke', 'blue');
    let path = select('.line');
    const pathLength = path.node().getTotalLength();
    const transitionPath = transition()
      .duration(1500);

    path
      .attr('stroke-dashoffset', pathLength)
      .attr('stroke-dasharray', pathLength)
      .transition(transitionPath)
      .attr('stroke-dashoffset', 0);
  },[]);

  return (
        <div style={{backgroundColor: 'grey', width: '400px'}}>
          <svg width='400' height='300' style={{overflow: 'visible'}} ref={ svgRef }>
            <g className='x-axis'></g>
            <g className='y-axis'></g>
          </svg>
        </div>
  );
}

export default App;
