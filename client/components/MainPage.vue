<template>
  <send-survey class="marginThis"/>
  <get-survey />
</template>

<script>
import SendSurvey from './SendSurvey.vue'
import GetSurvey from './GetSurvey.vue'

export default {
  name: 'MainPage',
  components: {
    SendSurvey,
    GetSurvey
  }
}
</script>

<style>
.marginThis {
  margin-bottom: 30px;
}
</style>