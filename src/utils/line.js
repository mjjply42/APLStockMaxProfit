import { select, line, transition } from 'd3';
import { parseDate } from './date.js';

export const animateLine = () => {
    let path = select('.line');
    const pathLength = path.node().getTotalLength();
    const transitionPath = transition()
        .duration(1500);
        
    path
        .attr('stroke-dashoffset', pathLength)
        .attr('stroke-dasharray', pathLength)
        .transition(transitionPath)
        .attr('stroke-dashoffset', 0);
}

export const addLineToChart = (x, y, data, svg) => {
    let liner = line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.price); });
    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", liner);
    animateLine();
}

export const addGainLine = (x, item, index, svg) => {
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
        .attr('stroke-dashoffset', 0);
}