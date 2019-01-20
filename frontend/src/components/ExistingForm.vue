<template>
   <form class="existing">
        <label for="code">code</label>
        <input type="text" name="code" id="code" v-model="id" placeholder="poll id">
        <button id="existing" @click.prevent="submit()">Go</button>
   </form>
</template>

<script>
import config from '@/config.js';

export default {
  name: 'exiting-form',
  data() {
    return {
      id: null,
    };
  },
  methods: {
    submit() {
      if (this.id) {
        console.log(config.API);
      }
    },
  },
};
</script>

<style>

</style>
