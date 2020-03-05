import { area, select } from 'd3';
import { height } from './svgMeasure.js';

const areaGradient = [{stop: 'lightblue', offset: '0%'}, {stop: 'white', offset: '70%'}]

const getAreaElement = (x, y, data) => {
    let arear = area()
        .x(function(d) { return x(d.date); })
        .y0(height)
        .y1(function(d) { return y(d.price); });
    return (arear);
}

const appendNewArea = (svg, data, arear) => {
    svg.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", arear);
}

const setAreaTransition = () => {
    let shaded = select('.area');
    shaded
        .transition()
        .duration(2500)
        .attr("fill-opacity", 1)
}

const createGradient = (defs) => {
    const bgGradient = defs
        .append('linearGradient')
        .attr('id', 'area-gradient')
        .attr('gradientTransform', 'rotate(90)');
    areaGradient.forEach((item) => {
        bgGradient
            .append('stop')
            .attr('stop-color', item.stop)
            .attr('offset', item.offset)
    })
}

export const createShadedArea = (x, y, data, svg) => {
    const defs = svg.append('defs');
    let arear = getAreaElement(x, y, data);
    appendNewArea(svg, data, arear);
    /*const graphArea = svg
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);*/
    createGradient(defs);
    setAreaTransition();
}