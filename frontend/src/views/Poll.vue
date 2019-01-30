<template>
   <div id="poll">
      <Spinner v-if="page.loading" />
      <div class="form" v-if="!page.loading">
         <h1>{{ data.title }}</h1>
         <form @submit.prevent="update" class="options">
            
         </form>
      </div>
   </div>
</template>

<script>
import store from '@/store.js';
import Spinner from '@/components/Spinner.vue';

export default {
  name: 'Poll',
  components: {
    Spinner,
  },
  data() {
    return {
      page: {
        loading: true,
      },
      data: {
        title: 'title',
        options: [],
      },
    };
  },
  created() {
    const id = this.$route.query.id || store.getters.id;
    const url = store.getters.api;

    // console.log(id);

    store.commit('id', id);

    const pollData = this.data;
    const page = this.page;

   if (id !== store.getters.id){

    // GET DATA
    fetch(`${url}/poll/${id}`)
      .then(res => res.json())
      .then((data) => {
         console.log(data);

         pollData.title = data.title;
         pollData.options = data.options;

         store.commit('data', data);
         store.commit('id', id);

         page.loading = false;
      })
      .catch(error => console.error(error));
   } else {
      this.data = store.getters.data;
   }

  },
};
</script>

<style scoped>

</style>
