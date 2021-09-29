<template>
  <h1>Answer to a survey</h1>
  <survey :id="id"></survey>
</template>

<script>
import Survey from "../components/Survey.vue";
export default {
  data() {
    return {
      id: ""
    }
  },
  created(){
    this.id = this.$route.params.id
  },
  components: {
    Survey
  }
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
  background-color: black;
  border: 2px solid black;
  border-radius: 5px;
  box-shadow: 2px 2px rgba(66, 61, 61, 0.534);
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
