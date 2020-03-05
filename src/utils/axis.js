import { extent, axisBottom, axisLeft } from 'd3';
import { height, width } from './svgMeasure.js';
import { dateFormatter } from './date.js';

export const setAxisDomains = (x, y, data) => {
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
}

export const addAxisToChart = (x, y, svg) => {
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
}