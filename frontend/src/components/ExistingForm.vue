<template>
   <form class="existing">
        <label for="code">code</label>
        <input type="text" name="code" id="code" v-model="id" placeholder="poll id">
        <button id="existing" @click.prevent="submit()">Go</button>
   </form>
</template>

<script>
import store from '@/store.js';

export default {
  name: 'exiting-form',
  data() {
    return {
      id: null,
    };
  },
  methods: {
    submit() {
      if (this.id && this.id.toString().length > 2) {
        store.commit('changeID', this.id);

        this.$router.push('/poll');
      }
      // TODO: Add error notification
    },
  },
};
</script>

<style>

</style>
