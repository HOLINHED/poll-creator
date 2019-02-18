<template>
   <v-card dark color="red">
      <v-card-title>ERROR</v-card-title>
      <v-card-text>
         {{ message }}
      </v-card-text>
   </v-card>
</template>

<script>
export default {
  data() {
    return {
      message: 'There was an error of some sort.',
    };
  },
};
</script>

<style>

</style>
