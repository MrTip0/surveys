<template>
    <div>
        <survey v-for="i in show" :id="lastOne - i" :key="i" class="marginThis"></survey>
        <button @click="showMore()" v-if="show < lastOne">Show more</button>
    </div>
</template>

<script>
import Survey from "../components/Survey.vue";
export default {
    data (){
        return {
            lastOne: 0,
            show: 0,
        }
    },
    components: {
        Survey
    },
    methods: {
        showMore() {
            if ((this.show + 4) < this.lastOne) {
                this.show += 4
            } else {
                this.show = this.lastOne
            }
        }
    },
    created() {
        fetch('/lastIndex')
            .then(response => {
                response.text()
                    .then(responseText => {
                        this.lastOne = parseInt(responseText)
                        this.showMore()
                        })
                })
    }
}
</script>

<style scoped>
    .marginThis {
        padding-bottom: 100px;
    }
    button {
        width: 70vw;
        height: 50px;
        background-color: paleturquoise;
        border: none;
        border-radius: 10px;
        font-size: larger;
    }
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>