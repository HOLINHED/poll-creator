<template>
   <div id="poll">
      <Spinner v-if="page.loading" />
      <div class="form" v-if="!page.loading">
         <div class="info">
            <label for="pollid">Poll ID
               <input v-bind:value="data.id" id="pollid">
            </label>
            <label for="polllink">Link
               <input v-bind:value="page.url" id="polllink">
            </label>
         </div>
         <h1>{{ data.title }}</h1>
         <form @submit.prevent="update" class="options">
            <div class="option" v-for="(option,index) in data.options" :key="(option,index)">
               <label>
               <input type="radio" name="vote" :value="index" @click="setIndex(index)">
               {{ option.desc }} ({{ option.votes }} VOTES)
               </label>
            </div>
            <button type="submit">Submit</button>
         </form>
      </div>
   </div>
</template>

<script>
import store from '@/store';
import Spinner from '@/components/Spinner.vue';

export default {
  name: 'Poll',
  components: {
    Spinner,
  },
  data() {
    return {
      page: {
        loading: true,
        url: window.location.href,
        index: null,
      },
      data: {
        id: null,
        title: 'title',
        options: [],
      },
    };
  },
  methods: {
    update() {
      // console.log("INDEX : " + this.page.index);

      if (this.page.index) {
        // Subtracting 1 because 0 id a possibility, and then the if statement above
        // wouldn't allow the update method to run because 0 evaluates to false.
        this.page.index--;

        const url = store.getters.api;

        // Creating new data to be pushed
        const data = {
          id: this.data.id,
          title: this.data.title,
          options: this.data.options,
        };

        // Adding 1 vote to the correct option.
        data.options[this.page.index].votes += 1;

        // Storing reference to router because its used in fetch.
        const router = this.$router;

        // Push updated data to the server.
        fetch(`${url}/poll/${this.data.id}`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json',
          },
        })
          .then(res => res.json())
          .then((dat) => {
            // Push data to vuex store before going to results page.s
            store.commit('data', dat);
            store.commit('id', dat.id);

            router.push('/results');
          })
          .catch((err) => {
            alert(err);
          });
      } else {
        // TODO: Make this an error message instead of an alert.
        alert('please select an option!');
      }
    },
    setIndex(index) {
      // Sets index to 1 above actual index because 0 evaluates to false.
      this.page.index = index + 1;
    },
  },
  created() {
    // Gets data either from url, or vuex store.
    const id = this.$route.query.id || store.getters.id;
    const url = store.getters.api;

    this.data.id = id;

    // Stores id in vuex store
    store.commit('id', id);

    // Keep these references because they're used in fetch.
    const pollData = this.data;
    const page = this.page;

    // Get poll from server.
    fetch(`${url}/poll/${id}`)
      .then(res => res.json())
      .then((dat) => {
        // Set data received from server, which is always returned in an
        // array in index 0.
        pollData.title = dat[0].title;
        pollData.options = dat[0].options;

        // Store the data in vuex store.
        store.commit('data', dat);
        store.commit('id', id);

        // Set loading to false to allow the user to see the poll.
        page.loading = false;
      })
      // TODO: put this in an error component.
      .catch(error => console.error(error));
  },
};
</script>

<style scoped>

.options {
   display: flex;
   flex-direction: column;
   width: 25%;
   margin: 0 auto;
   justify-content: space-around;
}

.option {
   margin-bottom: 25px;
   display: flex;
   flex-direction: row-reverse;
}

.info {
   width: 190px;
   margin: 0 auto;
   margin-top: 20px;
}

.info input {
   margin-bottom: 10px;
}

label {
   display: flex;
   text-align: left;
   width: 100%;
}

label input {
   justify-self: flex-end;
   margin-right: 10px;
}

button {
   width: 50px;
   margin: 0 auto;
}

</style>
