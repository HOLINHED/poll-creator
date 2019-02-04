<template>
   <form class="existing">
        <label for="code">code</label>
        <input type="text" name="code" id="code" v-model="id" placeholder="poll id">
        <button id="existing" @click.prevent="submit()">Go</button>
   </form>
</template>

<script>

export default {
  name: 'exiting-form',
  data() {
    return {
      id: null,
    };
  },
  methods: {
    submit() {
      if (this.id && this.id.toString().length > 1) {
        this.$router.push(`/poll?id=${this.id}`);
      }
    },
  },
};
</script>

<style scoped>
input {
   margin-left: 5px;
}
</style>
