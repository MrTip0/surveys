<template>
  <send-survey class="marginThis"/>
</template>

<script>
import SendSurvey from './SendSurvey.vue'

export default {
  name: 'MainPage',
  components: {
    SendSurvey
  }
}
</script>

<style>
.marginThis {
  margin-bottom: 30px;
}
</style>