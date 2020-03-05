import { format, timeFormat, timeParse } from 'd3';

export let dateFormatter = timeFormat("%y-%m-%d");
export let parseDate = timeParse("%Y-%m-%e");
export let formatValue = format(",");