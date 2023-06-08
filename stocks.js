const svg = d3.select("svg")

svg.attr("viewBox", "0 0 960 320");
// getAttribute()

d3.json("1y.json").then(function (data) {

  const dateParse = d3.timeParse("%Y-%m-%d")

  data = data.map((d, i) => {
    return {
      close: d.close,
      date: dateParse(d.date)
    }
  })
  // Min & max values of dates (edges)
  const minDate = d3.min(data, (d, i) => { return d.date })
  const maxDate = d3.max(data, (d, i) => { return d.date })

  // Min & max values of closes (edges)
  const minClose = d3.min(data, (d, i) => { return d.close })
  const maxClose = d3.max(data, (d, i) => { return d.close })

  const dateScale = d3.scaleTime()
    .domain([minDate, maxDate])
    .range([60, 900])

  const closeScale = d3.scaleLinear()
    .domain([minClose, maxClose])
    .range([280, 60])

  const line = d3.line()
    .x((d, i) => { return dateScale(d.date) })
    .y((d, i) => { return closeScale(d.close) })

  const area = d3.area()
    .x0((d, i) => { return dateScale(d.date) })
    .x1((d, i) => { return dateScale(d.date) })
    .y0((d, i) => { return closeScale(minClose - 10) })
    .y1((d, i) => { return closeScale(d.close) })

  svg.append("path").datum(data).attr("class", "area").attr("d", area)

  svg.append("path").datum(data).attr("class", "line").attr("d", line)

  const hoverGroup = svg
    .append("g")
    .attr("transform", "translate(100, 100)")

  hoverGroup.append("rect").attr("x", -50).attr("y", -60).attr("width", 100).attr("height", 50) 

})