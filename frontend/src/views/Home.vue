<template>
  <div class="home">
    <h1>Welcome!</h1>
    <p>Create a new poll or access an existing one</p>
    <div class="container">
      <div>
        <v-btn to="/new" color="blue" outline>New poll</v-btn>
      </div>
      <ExistingForm />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ExistingForm from '@/components/ExistingForm.vue';

export default {
  name: 'home',
  components: {
    ExistingForm,
  },
};
</script>

<style scoped>
.home {
  margin-top: 20px;
  font-size: 17px;
  height: 100%;
}
.container {
  width: 50%;
  margin: 0 auto;
  justify-items: center;
}
#new {
  width: 100px;
  margin: 0 auto;
}
</style>
