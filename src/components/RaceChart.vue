<template>
  <div class="container">
    <!-- <h3>Charts</h3> -->
    <svg id="chart" style="width: 80vw;height: 80vh;"></svg>

  </div>
</template>

<script>
import  {mapGetters} from 'vuex'
export default {
name:'RaceChart',
created(){
this.$store.dispatch('covid')
},
mounted(){
    setTimeout(() => {
    const totalCovidDataState = this.covidCasesData
    const groupedData = this.processData(totalCovidDataState);
    // console.log(groupedData); 
    this.plotChart(groupedData)
    }, 100);
  },
  computed:mapGetters(['covidCasesData']),
methods:{
  
 async plotChart(data) {
    const svg = d3.select("#chart")
    const width = svg.node().clientWidth;
    const height = svg.node().clientHeight;
    const ticker = 500;
    // const date=2102;

    const dateList = Array.from(data.keys())
    const fontSize = 16;
    const rectProperties = {height: 20, padding: 10}
    const container = svg.append("g")
                            .classed("container", true)
                            .style("transform", "translateY(25px)")


    const widthScale = d3.scaleLinear()
    const axisTop = svg
                    .append('g')
                    .classed('axis', true)
                    .style("transform", "translate(10px, 20px)")
                    .call(d3.axisTop(widthScale))

    const update = (date) =>  {

        const presentData = this.processEachDateData(data.get(date).get("Confirmed")[0])
        widthScale.domain([0, d3.max(Object.values(presentData), d => d.value)])
                .range([0, width - fontSize - 50])

        axisTop                
            .transition()
            .duration(ticker / 1.2)
            .ease(d3.easeLinear)
            .call(d3.axisTop(widthScale))

        const sortedRange = [...presentData].sort((a,b) => b.value - a.value)

        container
            .selectAll("text")
            .data(presentData)
            .enter()
            .append("text")

        container
            .selectAll("text")
            .text(d => d.key + " "+ d.value)
            .transition()
            .delay(500)
            .attr("x", d => widthScale(d.value) + fontSize)
            .attr("y", (d,i) => sortedRange.findIndex(e => e.key === d.key) * (rectProperties.height + rectProperties.padding) + fontSize) 

        container
            .selectAll("rect")
            .data(presentData)
            .enter()
            .append("rect")
            .attr("fill",d=>d3.hsl(Math.random()*360,0.75,0.75))
            // .classed("colors",true)

        container
            .selectAll("rect")
            .attr("x", 10)
            .transition()
            .delay(500)
            .attr("y", (d,i) => sortedRange.findIndex(e => e.key === d.key) * (rectProperties.height + rectProperties.padding))
            .attr("width", d => d.value <= 0? 0 : widthScale(d.value))
            .attr("height", 20)
            

var len=container.selectAll("rect").size()
// console.log(len);

    }
    for (const date of dateList) {
        update(date)
        await new Promise(done => setTimeout(() => done(), ticker));
    } 
},

processData(data) { 
    return d3.group(data, d => d.date, e => e.status);
},

processEachDateData(data) {
    //remove status and date
    delete data.date
    delete data.status
    delete data.tt // tt is total 

    return Object.keys(data)
            .map(key => ({key, value: parseInt(data[key])}))
            // .sort((a,b) => b.value-a.value) 
}
}

// methods:{
// plotChart(data) {
//     const svg = d3.select("#chart")
//     const width = svg.node().clientWidth;
//     const height = svg.node().clientHeight;

//     const dateList = Array.from(data.keys()) 
//     const presentDate = dateList[0]

//     const presentData = this.processEachDateData(data.get(presentDate).get("Confirmed")[0])
            
//     const widthScale = d3.scaleLinear()
//                       .domain([0, d3.max(Object.values(presentData), d => parseInt(d.value))])
//                       .range([0, width])

//     const container = svg.append("g")
//                           .classed("container", true)
//     const rectProperties = {height: 20, padding: 10}
//     console.log(rectProperties.height);
//     container.selectAll("rect")
//               .data(presentData)
//               .enter()
//               .append("rect")
//               .attr("x", 10)
//               // .attr("y", (d,i) => i * (30))
//               .attr("y", (d,i) => i * (rectProperties.height + rectProperties.padding))
//               .attr("width", d => widthScale(parseInt(d.value)))
//               .attr("height", 20)
              
// },

// processData(data) { 
//    return d3.group(data, d => d.date, e => e.status);
// },

// processEachDateData(data) {
//    //remove status and date
//    console.log(Object.keys(data))
//    delete data.date
//    delete data.status

//    return Object.keys(data)
//                 .map(key => ({key, value: data[key]}))
//                 .sort((a,b) => b.value-a.value) 
// }
// }

}

</script>

<style>

</style>