<template>
    <h1>Open a survey</h1>
    <form @submit.prevent="send()">
        <input type="text" v-model="question" class="text">
        <input v-if="question != ''" type="submit" value="Send">
    </form>
    <div v-if="gotResponse" class="response">
        <h1>Registered</h1>
        <p>{{code}}</p>
    </div>
</template>

<script>
export default {
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
                this.code = "The url is: https://tipettino-survey-app.herokuapp.com/survey/" + xhttp.response
                this.gotResponse = true
            }
            xhttp.open('POST', '/add-survey', true)
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            xhttp.send(`question=${this.question}`)
            this.question = ""
        }
    }
}
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}
input {
    color: black;
    width: 50vw;
    height: 40px;
    border: none;
    border-radius: 5px;
    background-color: white;
}
input:hover {
    transform: scale(1.2);
}
.response {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50vw;
}
h1 {
    text-align: center;
    word-break: break-all;
}
p {
    width: 100%;
    word-break: break-all;
}
.text {
    border: 1px solid black;
    text-align: center;
    margin-bottom: 10px;
}
</style>