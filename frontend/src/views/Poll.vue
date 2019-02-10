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
               {{ option.desc }} ({{ option.votes }} VOTES)</label>
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

         this.page.index--;

        const url = store.getters.api;

        const data = {
          id: this.data.id,
          title: this.data.title,
          options: this.data.options,
        };

        data.options[this.page.index].votes += 1;

        console.log(`${url}/poll/${this.data.id}`);

        // PUSH UPDATE DATA TO SERVER
        fetch(`${url}/poll/${this.data.id}`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json',
          },
        })
          .then(res => res.json())
          .then((dat) => {
            console.log(dat);
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
      this.page.index = index + 1;
    },
  },
  created() {
    const id = this.$route.query.id || store.getters.id;
    const url = store.getters.api;

    // console.log(id);
    this.data.id = id;

    store.commit('id', id);

    const pollData = this.data;
    const page = this.page;

    // GET DATA
    fetch(`${url}/poll/${id}`)
      .then(res => res.json())
      .then((dat) => {
         //console.log(dat);

        pollData.title = dat[0].title;
        pollData.options = dat[0].options;

        ///console.log(pollData.title);
        //console.log(pollData.options);

        store.commit('data', dat);
        store.commit('id', id);

        page.loading = false;
      })
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
