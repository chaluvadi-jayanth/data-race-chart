<template>
  <div class="container">
    <h1>Bar-chart</h1>
    <Charts1  />
  </div>
</template>

<script>
import  Charts1 from "./components/Charts1";

export default {
  name: 'App',
  components: {
  Charts1
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
