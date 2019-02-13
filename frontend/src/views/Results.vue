<template>
   <div id="container">
      <Spinner v-if="page.loading" />
      <div v-if="!page.loading">
         <h1>Thanks for voting!</h1>
         <h2>{{ data.title }}</h2>
         <div v-for="(option, index) in data.options" :key="(option,index)" class="option">
            <div>[{{ index + 1 }}]</div>
            <div>{{ option.desc }} <span>(VOTES {{ option.votes }})</span></div>
         </div>
         <v-btn to="/" outline color="green">Go home</v-btn>
      </div>
   </div>
</template>

<script>
import store from '@/store';
import Spinner from '@/components/Spinner.vue';

export default {
  name: 'Results',
  components: {
    Spinner,
  },
  data() {
    return {
      data: {
        id: null,
        title: 'title',
        options: [],
      },
      page: {
        loading: true,
      },
    };
  },
  created() {
    // stores a reference to ID for cleaner code
    const id = this.$route.query.id;

    // console.log(this.$route.query.id);

    // checks if id is defined, if true, it will fetch data from server. if
    // false, it will use the data that is currently in the vuex store.
    if (id) {
      // get api link from vuex store
      const api = store.getters.api;

      // store referece because used in fetch
      const page = this.page;
      const pollData = this.data;

      // get poll data from server
      fetch(`${api}/poll/${id}`)
        .then(res => res.json())
        .then((dat) => {
          console.log('fetch complete!');
          console.log(dat);

          pollData.id = dat[0].id;
          pollData.title = dat[0].title;
          pollData.options = dat[0].options;

          page.loading = false;
        })
        .catch(error => console.error(error));
    } else {
      // Data from vuex store
      const data = store.getters.data;

      this.data.id = data.id;
      this.data.title = data.title;
      this.data.options = data.options;

      this.page.loading = false;
    }
  },
};
</script>

<style scoped>
   h1 {
      padding-bottom: 20px;
   }

   h2 {
      margin-bottom: 15px;
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
      margin-top: 20px;
      font-size: 17px;
   }
</style>
