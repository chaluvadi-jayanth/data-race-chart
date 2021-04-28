<template>
  <div class="container">
    <h1>Race-Chart</h1>
    <RaceChart />
  </div>
</template>

<script>
import  RaceChart from './components/RaceChart';

export default {
  name: 'App',
  components: {
  RaceChart
  }
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
