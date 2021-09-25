<template>
  <h1>{{msg}}</h1>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      msg: "You did it"
    }
  }
}
</script>

<style scoped>
h1 {
  font-family: 'Courier New', Courier, monospace;
}
</style>