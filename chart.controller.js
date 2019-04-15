const d3Node = require('d3-node');

function makeSvgDouble(w, h, data1, data2) {

    //Add css for line1 and line2
    const d3n = new d3Node({styles: ".line {fill: none;stroke: #38afac;stroke-width: 3;}.dot {fill: #38afac;stroke: #fff;}.line1 {fill: none;stroke: #c92323;stroke-width: 3;}.dot1 {fill: #c92323;stroke: #fff;}"});
    const d3 = d3n.d3;

    let margin = {top: 50, right: 50, bottom: 50, left: 50};
    let width = w - (margin.left + margin.right);
    let height = h - (margin.bottom + margin.top);


    const x1 = getX(data1);
    const y1 = getY(data1);

    const x2 = getY(data2);
    const y2 = getY(data2);


    //Create x-axis
    let xScale = d3.scalePoint()
        .domain(x1) // input
        .range([0, width]); // output

    // find max value of the Y-axis
    const max1 = Math.max.apply(Math, y1);
    const max2 = Math.max.apply(Math, y2);
    const max = (max1 > max2) ? max1 : max2;

    //Create y-axis
    let yScale = d3.scaleLinear()
        .domain([0, max]) // input
        .range([height, 0]); // output

    let line1 = d3.line()
        .x(function (d, i) {
            return xScale(x1[i]);
        }) // set the x values for the line generator
        .y(function (d, i) {
            return yScale(y1[i]);
        }) // set the y values for the line generator
        .curve(d3.curveMonotoneX); // apply smoothing to the line

    let line2 = d3.line()
        .x(function (d, i) {
            return xScale(x1[i]);
        }) // set the x values for the line generator
        .y(function (d, i) {
            return yScale(y2[i]);
        }) // set the y values for the line generator
        .curve(d3.curveMonotoneX); // apply smoothing to the line


    //Create the SVG tag
    let svg = d3n.createSVG(width + (margin.left + margin.right), height + (margin.top + margin.bottom))
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); //Positioning offset


    //Create X-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")   //Positioning offset
        .call(d3.axisBottom(xScale)); // Create component

    // Create y-axis
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale)); // Create component

    // add the line to the svg
    svg.append("path")
        .datum(data1)
        .attr("class", "line") // set class for styling
        .attr("d", line1); // create line component

    // Add dots to the line
    svg.selectAll(".dot")
        .data(data1)
        .enter().append("circle")
        .attr("class", "dot") // set class for styling
        .attr("cx", function (d, i) {
            return xScale(x1[i]);
        })
        .attr("cy", function (d, i) {
            return yScale(y1[i]);
        })
        .attr("r", 5); //set radius of the dots

    svg.append("path")
        .datum(data2)
        .attr("class", "line1")
        .attr("d", line2);

    svg.selectAll(".dot1")
        .data(data1)
        .enter().append("circle")
        .attr("class", "dot1")
        .attr("cx", function (d, i) {
            return xScale(x1[i]);
        })
        .attr("cy", function (d, i) {
            return yScale(y2[i]);
        })
        .attr("r", 5);

    return d3n.svgString();
}

function getX(data) {
    return data.map(function (value, key) {
        return Object.keys(value)[0];
    });
}

function getY(data) {
    return data.map(function (value, key) {
        return parseFloat(Object.values(value)[0]);
    });
}

function makeSvgSingle(w, h, data) {

    //Add css for line1 and line2
    const d3n = new d3Node({styles: ".line {fill: none;stroke: #38afac;stroke-width: 3;}.dot {fill: #38afac;stroke: #fff;}.line1 {fill: none;stroke: #c92323;stroke-width: 3;}.dot1 {fill: #c92323;stroke: #fff;}"});
    const d3 = d3n.d3;

    let margin = {top: 50, right: 50, bottom: 50, left: 50};
    let width = w - (margin.left + margin.right);
    let height = h - (margin.bottom + margin.top);


    const x1 = getX(data);
    const y1 = getY(data);


    //Create x-axis
    let xScale = d3.scalePoint()
        .domain(x1) // input
        .range([0, width]); // output

    // find max value of the Y-axis
    const max = Math.max.apply(Math, y1);

    //Create y-axis
    let yScale = d3.scaleLinear()
        .domain([0, max]) // input
        .range([height, 0]); // output

    let line = d3.line()
        .x(function (d, i) {
            return xScale(x1[i]);
        }) // set the x values for the line generator
        .y(function (d, i) {
            return yScale(y1[i]);
        }) // set the y values for the line generator
        .curve(d3.curveMonotoneX); // apply smoothing to the line

    //Create the SVG tag
    let svg = d3n.createSVG(width + (margin.left + margin.right), height + (margin.top + margin.bottom))
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); //Positioning offset


    //Create X-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")   //Positioning offset
        .call(d3.axisBottom(xScale)); // Create component

    // Create y-axis
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale)); // Create component

    // add the line to the svg
    svg.append("path")
        .datum(data)
        .attr("class", "line") // set class for styling
        .attr("d", line); // create line component

    // Add dots to the line
    svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot") // set class for styling
        .attr("cx", function (d, i) {
            return xScale(x1[i]);
        })
        .attr("cy", function (d, i) {
            return yScale(y1[i]);
        })
        .attr("r", 5); //set radius of the dots

    return d3n.svgString();
}

exports.makeChart = (req, res) => {

    if (!req.query.data1){
        res.status(422).send("Data 1 array not found");
        return
    }

    if (!req.query.data2){
        res.status(422).send("Data 2 array not found");
        return
    }

    let data1 = JSON.parse(req.query.data1);
    let data2 = JSON.parse(req.query.data2);

    let width = req.query.width;
    let height = req.query.height;

    if (!width || width < 150) {
        res.status(422).send("Width not set or less than 150");
        return
    }

    if (!height || height < 150) {
        res.status(422).send("Height not set or less than 150");
        return
    }

    if (data1.length !== data2.length) {
        res.status(422).send("data1 and data2 not the same length");
        return
    }

    res.send(makeSvgDouble(req.query.width, req.query.height, data1, data2))
};

exports.makeSingleChart = (req, res) => {

    if (!req.query.data){
        res.status(422).send("Data array not found");
        return
    }

    let data = JSON.parse(req.query.data);

    let width = req.query.width;
    let height = req.query.height;

    if (!width || width < 150) {
        res.status(422).send("Width not set or less than 150");
        return
    }

    if (!height || height < 150) {
        res.status(422).send("Height not set or less than 150");
        return
    }

    res.send(makeSvgSingle(req.query.width, req.query.height, data))
};