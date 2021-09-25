<template>
  <form @submit.prevent="requestSurvey()">
      <input type="number" v-model="id" placeholder="survey id">
      <input type="submit" value="see">
  </form>
  <div v-if="show">
      <p> {{ values.question }}</p>
      <button class="yes" @click="vote('yes')"> {{ values.yes }}</button>
      <button class="no" @click="vote('no')"> {{ values.no }}</button>
  </div>
</template>

<script>
export default {
    name: 'GetSurvey',
    data() {
        return {
            id: '',
            values: {
                question: '',
                yes: 0,
                no: 0
            },
            show: false
        }
    },
    methods: {
        requestSurvey(){
            let xhttp = new XMLHttpRequest()
            xhttp.open('GET', `/get-survey?id=${this.id}`, true)
            xhttp.onload = ()=>{
                let response = JSON.parse(xhttp.response)
                this.values.question = response.survey_question
                this.values.yes = response.yes
                this.values.no = response.no
                this.show = true
            }
            xhttp.send()
        },
        vote(yn){
            let xhttp = new XMLHttpRequest()
            xhttp.open('GET', `/vote?id=${this.id}&response=${yn}`, true)
            xhttp.onload = ()=>{
                if (xhttp.response == 'successful') {
                        this.requestSurvey()
                } else {
                    alert("error")
                }
            }
            xhttp.send()
        }
    }
}
</script>

<style>

</style>