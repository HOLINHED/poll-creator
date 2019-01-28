<template>
   <div id="poll">
      <h1>{{ data.title }}</h1>
   </div>
</template>

<script>
import store from '@/store.js'

export default {
   name: 'poll',
   data() {
      return {
         data: {
            title: 'loading',
            options: []
         }
      }
   },
   created() {

      const id = this.$route.query.id || store.getters.ID;
      let data = this.data;

      store.dispatch('getData', id)
      .finally(function(){
         const res = store.getters.data;

         data.title = res.title;
         data.options = res.options;
      });
   }
};
</script>

<style scoped>

</style>
