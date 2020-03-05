import { select, bisector, mouse } from 'd3';
import { dateFormatter, formatValue } from './date.js';
import { width, height } from './svgMeasure.js';


export const createTooltip = (x, y, data, svg) => {
    let bisectDate = bisector(function(d) { return d.date; }).left;
    let tooltip = select(".container").append("div")
        .attr("class", "tooltip")
        .style("display", "none");

        let focus = svg.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus.append("circle")
            .attr("r", 8);

        tooltip.append("div")
            .attr("class", "tooltip-date");

        let tooltipPrice = tooltip.append("div");
        tooltipPrice.append("span")
            .attr("class", "tooltip-title")
            .text("Price: ");

        tooltipPrice.append("span")
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
}