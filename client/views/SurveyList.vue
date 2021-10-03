<template>
    <div>
        <survey v-for="(id, i) in show" :id="id" :key="i" class="marginThis"></survey>
        <button @click="showMore()" v-if="idS.length > 0">Show more</button>
    </div>
</template>

<script>
import Survey from "../components/Survey.vue";
export default {
    data (){
        return {
            idS: [],
            show: [],
        }
    },
    components: {
        Survey
    },
    methods: {
        showMore() {
            for(let i = 0; i < 4 && this.idS.length > 0; i++) {
                this.show.push(this.idS.pop())
            }
        }
    },
    created() {
        fetch('/list')
            .then(response => response.json())
            .then(responseJson => {
                responseJson.forEach(element => {
                    this.idS.push(element.id)
                });
                this.showMore()
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