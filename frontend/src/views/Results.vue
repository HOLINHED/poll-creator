<template>
   <div id="container">
      <h1>Thanks for voting!</h1>
      <h2>{{ data.title }}</h2>
      <div v-for="(option, index) in data.options" :key="(option,index)" class="option">
         <div>[{{ index + 1 }}]</div>
         <div>{{ option.desc }} <span>(VOTES {{ option.votes }})</span></div>
      </div>
   </div>
</template>

<script>
import store from '@/store';

export default {
  name: 'Results',
  data() {
    return {
      data: {
        id: null,
        title: 'title',
        options: [],
      },
    };
  },
  created() {

    // Gets data from vuex store because that's where it was stored
    // after the votes reuqest was successful.

    const data = store.getters.data;

    this.data.id = data.id;
    this.data.title = data.title;
    this.data.options = data.options;
  },
};
</script>

<style scoped>
   h1 {
      border-bottom: 1px solid black;
      padding-bottom: 20px;
   }

   span {
      color: gray;
   }

   .option  {
      padding-bottom: 15px;
      text-align: left;
      display: flex;
   }

   .option div {
      margin-left: 10px;
   }

   #container {
      width: 600px;
      margin: 0 auto;
   }
</style>
