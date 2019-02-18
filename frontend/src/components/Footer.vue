<template>
  <v-footer
    dark
    height="auto"
    
  >
    <v-card
      class="flex"
      flat
      tile
    >
      <v-card-title class="blue">
        <strong class="subheading">&copy;2019- dawidklat.com</strong>

        <v-spacer></v-spacer>

        <v-btn
          class="mx-3"
          dark
          flat
          href="https://github.com/holinhed/poll-creator"
        >
        Github
        </v-btn>

        <v-btn
          class="mx-3"
          dark
          flat
          href="https://dawidklat.com"
        >
        Personal Site
        </v-btn>
      </v-card-title>
    </v-card>
  </v-footer>
</template>

<script>
export default {

};
</script>

<style scoped>
#footer1{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>
