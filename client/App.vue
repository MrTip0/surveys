<template>
  <nav>
    <h1>Surveys</h1>
    <router-link to="/">Create a survey</router-link>
    <router-link to="/surveys">Watch all surveys</router-link>
  </nav>
  <div class="VueView">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
}
</script>

<style>
body {
  font-family: 'Courier New', Courier, monospace;
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100%;
}
.VueView {
  padding-top: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
}
</style>

<style scoped>
nav {
  overflow: hidden;
  background-color: paleturquoise;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

nav a {
  font-weight: bold;
  font-size: larger;
  float: left;
  text-align: center;
  padding: 14px;
  text-decoration: none;
  color: black;
  border-left: 1px solid black;
  border-right: 1px solid black;
  width: 25vw;
}

.content {
  padding: 16px;
}
</style>