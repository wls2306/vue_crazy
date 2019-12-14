<template>
  <div id="app">
    <transition name="fade">  
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* background-color: #2D3A4B; */
  /* color: #2c3e50; */

}
</style>
