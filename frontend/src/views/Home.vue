<template>
  <div class="home">
    <h1>Welcome!</h1>
    <p>Create a new poll or access an existing one</p>
    <div class="container">
      <button id="new">New poll</button>
      <form class="existing">
        <input type="text" name="code" id="code">
        <button id="existing">Go</button>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
    
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
  justify-items: center;
}

#new {
  width: 100px;
  margin: 0 auto;
  margin-bottom: 20px;
}
</style>
