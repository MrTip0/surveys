<template>
  <send-survey />
  <get-survey />
</template>

<script>
import SendSurvey from './components/SendSurvey.vue'
import GetSurvey from './components/GetSurvey.vue'

export default {
  name: 'App',
  components: {
    SendSurvey,
    GetSurvey
  }
}
</script>

<style>
body {
  font-family: 'Courier New', Courier, monospace;
}
</style>