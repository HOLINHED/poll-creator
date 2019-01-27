<template>
   <div id="create">
      <h1>New poll</h1>
      <form id="poll" @submit.prevent="create()">
         <label for="title">Title</label>
         <input v-model="title" name="title" id="title" type="text" required>

         <div id="options">
            <div>
               <label for="optionOne">Option 1</label>
               <input v-model="optionOne" name="optionOne" id="optionOne" type="text" required>
            </div>

            <div>
               <label for="optionTwo">Option 2</label>
               <input v-model="optionTwo" name="optionTwo" id="optionTwo" type="text" required>
            </div>

            <div>
               <label for="optionThree">Option 3</label>
               <input v-model="optionThree" name="optionThree" id="optionThree" type="text">
            </div>

            <div>
               <label for="optionFour">Option 4</label>
               <input v-model="optionFour" name="optionFour" id="optionFour" type="text">
            </div>
         </div>
         <div id="buttons">
            <button type="submit">Create</button>
            <button type="reset">Reset</button>
         </div>
      </form>
   </div>
</template>

<script>
import store from '@/store.js';

export default {
  name: 'Create',
  data() {
    return {
      title: null,
      optionOne: null,
      optionTwo: null,
      optionThree: null,
      optionFour: null,
    };
  },
  methods: {
    create() {
      const data = {
        title: this.title,
        options: [
          this.optionOne,
          this.optionTwo,
          this.optionThree,
          this.optionFour,
        ],
      };

      store.dispatch('pushData', data)
      .finally(function() {

         const id = store.getters.id;

         this.$router.push(`/poll?${id}`);
      });
    },
  },
};
</script>

<style scoped>
#options div {
   margin-top: 30px;
}

#buttons {
   margin-top: 20px;
}

label {
   margin-right: 5px;
}
</style>
