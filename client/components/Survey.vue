<template>
  <div class="question">
    <p class="Qtext">{{ values.question }}</p>
    <div class="resultsBox">
      <button class="yes" @click="vote('yes')" :style="yesWidth">
        <p>YES</p>
        <p>{{ values.yes }}</p>
      </button>
      <button class="no" @click="vote('no')" :style="noWidth">
        <p>NO</p>
        <p>{{ values.no }}</p>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
  },
  data() {
    return {
      values: {
        question: "Loading...",
        yes: 0,
        no: 0,
      },
      yesWidth: "width: 50%",
      noWidth: "width: 50%",
    };
  },
  methods: {
    requestSurvey(id) {
      let xhttp = new XMLHttpRequest();
      xhttp.open("GET", `/get-survey?id=${id}`, true);
      xhttp.onload = () => {
        let response = JSON.parse(xhttp.response);
        this.values.question = response.survey_question;
        this.values.yes = response.yes;
        this.values.no = response.no;
        if (this.values.yes == 0 && this.values.no == 0) {
          this.yesWidth = "width: 50%;";
          this.noWidth = "width: 50%;";
        } else {
          let yessWidth =
            (this.values.yes * 100.0) / (this.values.yes + this.values.no);
          this.yesWidth = `width: ${yessWidth}%;`;
          this.noWidth = `width: ${100.0 - yessWidth - 0.1}%;`;
        }
        this.show = true;
      };
      xhttp.send();
    },
    vote(yn) {
      let xhttp = new XMLHttpRequest();
      console.log(this.id);
      xhttp.open("GET", `/vote?id=${this.id}&response=${yn}`, true);
      xhttp.onload = () => {
        if (xhttp.response == "successful") {
          this.requestSurvey(this.id);
        } else {
          alert("error");
        }
      };
      xhttp.send();
    },
  },
  created() {
    this.requestSurvey(this.id);
  },
};
</script>

<style scoped>
.question {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3vw;
}
.Qtext {
  border: 2px solid rgba(66, 61, 61, 0.534);
  border-radius: 5px;
  box-shadow: 2px 2px black;
  background-color: white;
  min-height: 50px;
  text-align: center;
  vertical-align: middle;
  word-break: break-all;
  width: 70vw;
  padding-top: 5px;
  font-size: larger;
}
.resultsBox {
  width: 70vw;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  align-content: stretch;
  background-color: black;
  border: 2px solid black;
  border-radius: 20px;
  box-shadow: 3px 3px 1px 1px rgba(66, 61, 61, 0.534);
  font-size: xx-large;
}
.yes {
  height: 100%;
  background-color: greenyellow;
  border: none;
  min-width: 10% !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: xx-large;
  border-radius: 20px 0px 0px 20px;
}
.no {
  height: 100%;
  background-color: red;
  border: none;
  min-width: 10% !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: xx-large;
  border-radius: 0px 20px 20px 0px;
}
input {
  width: 50vw;
  height: 40px;
  border-radius: 5px;
  border: none;
  margin-bottom: 20px;
}
input:hover {
  transform: scale(1.2);
}
.btn {
  border: 1px solid black;
  box-shadow: 3px 3px rgba(66, 61, 61, 0.534);
  background-color: white;
}
</style>
