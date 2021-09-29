<template>
    <survey v-for="i in lastOne" :id="lastOne - i" :key="i" class="marginThis"></survey>
</template>

<script>
import Survey from "../components/Survey.vue";
export default {
    data (){
        return {
            lastOne: 0
        }
    },
    components: {
        Survey
    },
    created() {
        fetch('/lastIndex')
            .then(response => {
                response.text()
                    .then(responseText => this.lastOne = parseInt(responseText))
                })
    }
}
</script>

<style scoped>
    .marginThis {
        padding-bottom: 100px;
    }
</style>