<template>
  <div class="container">
    <h1>Race-Chart</h1>
    <RaceChart :cases='cases'/>
  </div>
</template>

<script>
import  RaceChart from './components/RaceChart';
import {mapGetters} from 'vuex'

export default {
  name: 'App',
  data(){
return {
  
  cases:''
}
  },
  components: {
  RaceChart
  },
  methods:{
assignDataToCases(){
  this.cases=this.covidCasesData
  console.log(this.cases);
}
  },
    created(){
this.$store.dispatch('covid')

},
mounted(){
setTimeout(() => {
  this.assignDataToCases()
}, 100);
},
  computed:mapGetters(['covidCasesData']),
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
