<template>
<!--
   <footer id="footer">
      <a id="redirect" href="https://dawidklat.com">dawidklat.com</a>
      <a id="github" href="https://github.com/holinhed/poll-creator">Github</a>
      <a id="contact" href="#">Contact</a>
   </footer>
-->
  <v-footer dark  id="footer">
    <v-card class="flex" flat tile>
      <v-card-title class="blue">

      &copy;2019 — <strong>Dawidklat.com</strong>

      <v-spacer></v-spacer>

      <v-btn flat>Github</v-btn>
      <v-btn flat>Personal site</v-btn>

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

a {
   margin-right: 20px;
}
</style>
