<template>
   <div id="create">
      <h1>New poll</h1>
      <Loading v-if="page.loading"/>
      <form id="poll" @submit.prevent="create()" v-if="!page.loading">
         <label for="title">Title</label>
         <input v-model="title" name="title" maxlength="50" id="title" type="text" required>

         <div id="options">
            <div>
               <label for="optionOne">Option 1</label>
               <input v-model="optionOne.desc" maxlength="120" name="optionOne" id="optionOne" type="text" required>
            </div>

            <div>
               <label for="optionTwo">Option 2</label>
               <input v-model="optionTwo.desc" maxlength="120" name="optionTwo" id="optionTwo" type="text" required>
            </div>

            <div v-for="(option, index) in options" :key="(option, index)" id="nextOptions">
               <label for="">Option {{ index + 3 }}</label>
               <input type="text" :name="index" maxlength="120" v-model="option.desc">
            </div>

            <button @click="addOption" id="plus" type="button">+</button>

         </div>
         <div id="buttons">
            <button type="submit">Create</button>
            <button type="reset">Reset</button>
         </div>
      </form>
   </div>
</template>

<script>
import store from '@/store';
import Loading from '@/components/Spinner.vue';

export default {
  name: 'Create',
  components: {
    Loading,
  },
  data() {
    return {
      page: {
        loading: false,
      },
      title: null,
      optionOne: { desc: null, votes: 0 },
      optionTwo: { desc: null, votes: 0 },
      options: [],
    };
  },
  methods: {
    create() {
      // Creates a data object to be pushed to the server.
      const data = {
        title: this.title,
        options: [
          this.optionOne,
          this.optionTwo,
          ...this.options,
        ],
      };

      // Keeps reference to router because it's used in a fetch
      const router = this.$router;

      const url = store.getters.api;

      // Push the data to the server to be processed.
      fetch(`${url}/poll`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
        },
      })
        .then(res => res.json())
        .then((dat) => {
          // Redirect user to the created poll.
          router.push(`/poll?id=${dat.id}`);
        })
        // TODO: Create a component to display errors instead of an alert.
        .catch(err => alert(err));
    },
    addOption() {
      // Checks to make sure that there are less than 6 options. Max options is 5.
      if (this.options.length < 6) {
        this.options.push({
          desc: null,
          votes: 0,
        });
      }
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

#plus {
   margin-top: 10px;
}

label {
   margin-right: 5px;
}
</style>
