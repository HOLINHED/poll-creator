<template>
  <v-footer dark  id="footer">
    <v-card class="flex" flat tile>
      <v-card-title class="blue">

      &copy;2019 — <strong>Dawidklat.com</strong>

      <v-spacer></v-spacer>

      <v-btn flat href="https://github.com/holinhed/poll-creator">Github</v-btn>
      <v-btn flat href="https://dawidklat.com">Personal site</v-btn>

      </v-card-title>

    </v-card>
  </v-footer>
</template>

<script>
export default {

};
</script>

<style scoped>
#footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: right;
}
</style>
