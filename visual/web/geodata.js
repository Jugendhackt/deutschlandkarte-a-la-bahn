function createMap() {
    var svg1 = d3.select("#net"), height = 800, width = 700;
    var projection = d3.geoMercator()
        .scale(3000)
        .center([10, 51])
        .translate([width / 2, height / 2]);

    var path = d3.geoPath()
        .projection(projection);


    var promises = [
        d3.json("4_niedrig.geojson"),
        d3.json("https://fahrplandatengarten.de/netzkarte/d3api")
    ];
    Promise.all(promises).then(ready);

    function ready(param) {

        svg1.append("g")
            .selectAll("path")
            .data(param[0]["features"])
            .enter()
            .append("path")
            .attr("d", d3.geoPath()
                .projection(projection))
            .attr("fill", "#5b67bf");

        var lineGenerator = d3.line();
        var pathGroup = svg1.append("g")
        var paths = pathGroup.selectAll("path")
            .data(param[1]['connections'])
            .enter()
                .append("path")
                    .attr("stroke", "black")
                    .attr("fill", "black")
                    .attr("d", function(d, i){
                        return lineGenerator(d.link.map(projection))
                    })
                    .attr("stroke-width", function(d){
                      console.log(this.getTotalLength())
                      return (d.duration / this.getTotalLength()) / 8
                    })
                    .attr("opacity", 0.2)
                    .attr("display", "none")

        svg1.append("g")
            .selectAll("circle")
            .data(param[1]['stations'])
            .enter()
                .append("circle")
                    .attr("r", 5)
                    .attr("fill", "green")
                    .attr("transform", function(d, i){
                        return "translate(" + projection(d.location)+")"
                    })
                .on("click", function draw_lines(d, i){
                    paths.filter(path_data => {return JSON.stringify(path_data.link[0]) == JSON.stringify(d.location)})
                      .attr("display", "block")
                    paths.filter(path_data => { return JSON.stringify(path_data.link[0]) != JSON.stringify(d.location)})
                      .attr("display", "none")
                });



    }

}

createMap();
