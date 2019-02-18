<template>
   <div id="create">
      <h1>New poll</h1>
      <Loading v-if="page.loading"/>
      <form id="poll" @submit.prevent="create()" v-if="!page.loading">
         <v-text-field
            outline
            color="blue"
            placeholder="What do you want to ask?"
            label="Question"
            required
            counter="50"
            v-model="title"
         >
         </v-text-field>
         <v-text-field
            outline
            color="blue"
            label="Option 1"
            required
            counter="120"
            v-model="optionOne.desc"
         >
         </v-text-field>
         <v-text-field
            outline
            color="blue"
            label="Option 2"
            required
            counter="120"
            v-model="optionTwo.desc"
         >
         </v-text-field>
         <v-text-field
            v-for="(option, index) in options"
            :key="(option, index)"
            outline
            color="blue"
            v-bind:label="'Option ' + (index + 3)"
            counter="120"
            v-model="option.desc"
         >
         </v-text-field>
         <v-btn color="blue" outline @click="addOption" v-if="options.length < 3">Add</v-btn>
         <div id="buttons">
            <v-btn color="green" outline type="submit">Create</v-btn>
            <v-btn color="red" outline type="reset">Reset</v-btn>
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
      if (this.options.length < 3) {
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
h1 {
   margin-bottom: 20px;
}
#poll {
   width: 425px;
   margin: 0 auto;
}
#create {
   height: 100%;
   margin-top: 20px;
   font-size: 17px;
   padding-bottom: 30px;
}
</style>
