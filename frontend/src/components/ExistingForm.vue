<template>
  <v-container grid-list-md text-xs-center>
  <v-layout row wrap>
   <v-flex xs10>
    <v-text-field
      v-model="id"
      label="Enter poll id"
      outline
      color="blue"
    ></v-text-field>
   </v-flex>
   <v-flex xs2>
     <v-btn @click.prevent="submit()" large color="blue" dark>Go</v-btn>
   </v-flex>
 </v-layout>
  </v-container>
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

</style>
