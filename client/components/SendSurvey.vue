<template>
    <form @submit.prevent="send()">
        <textarea v-model="question" cols="30" rows="10"></textarea>
        <input v-if="question != ''" type="submit" value="Send">
    </form>
    <div v-if="gotResponse">
        <h1>Registered</h1>
        <p>{{code}}</p>
    </div>
</template>

<script>
export default {
    name: "SendSurvey",
    data() {
        return {
            question: "",
            gotResponse: false,
            code: ""
        }
    },
    methods: {
        send(){
            let xhttp = new XMLHttpRequest()
            xhttp.onload = ()=> {
                this.code = "The code is: " + xhttp.response
                this.gotResponse = true
            }
            xhttp.open('POST', '/add-survey', true)
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            xhttp.send(`question=${this.question}`)
        }
    }
}
</script>

<style>

</style>