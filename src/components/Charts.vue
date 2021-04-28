<template>
  <div class="container">
    <!-- <h3>Charts</h3> -->
    <svg id="chart" style="width: 80vw;height: 80vh;"></svg>

  </div>
</template>

<script>
export default {
name:'Charts',

mounted(){
fetch('https://api.covid19india.org/states_daily.json')
.then(res => res.json())
.then(data => {
  console.log(data)
  console.log("ok")
    const totalCovidDataState = data.states_daily 
    const groupedData = this.processData(totalCovidDataState); 
    this.plotChart(groupedData)
})
},

methods:{
plotChart(data) {
    const svg = d3.select("#chart")
    const width = svg.node().clientWidth;
    const height = svg.node().clientHeight;
    // console.log(width,height);

    const dateList = Array.from(data.keys()) 
    console.log(dateList[0]);
    const presentDate = dateList[0]

    const presentData = this.processEachDateData(data.get(presentDate).get("Confirmed")[0])
            
    const widthScale = d3.scaleLinear()
                      .domain([0, d3.max(Object.values(presentData), d => parseInt(d.value))])
                      .range([0, width])

    const container = svg.append("g")
                          .classed("container", true)
    const rectProperties = {height: 20, padding: 10}
    console.log(rectProperties.height);
    container.selectAll("rect")
              .data(presentData)
              .enter()
              .append("rect")
              .attr("x", 10)
              // .attr("y", (d,i) => i * (30))
              // i = index
              //i * (rectProperties.height + rectProperties.padding)
              // .attr("y", (d,i) =>console.log(i * (rectProperties.height + rectProperties.padding),i) )
              .attr("y",(d,i)=>i * (rectProperties.height + rectProperties.padding))
              .attr("width", d => widthScale(parseInt(d.value)))
              .attr("height", 20)
              .attr("fill",'blue')
              
},

processData(data) { 
  // console.log( d3.group(data, d => d.date, e => e.status))
  return d3.group(data, d => d.date, e => e.status);
},

processEachDateData(data) {
   //remove status and date
  console.log(Object.keys(data))
  delete data.date
  delete data.status

  return Object.keys(data)
                .map(key => ({key, value: data[key]}))
                .sort((a,b) => b.value-a.value) 
}
}

}

</script>

<style>

</style>