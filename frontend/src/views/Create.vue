<template>
   <div id="create">
      <h1>New poll</h1>
      <form id="poll" @submit.prevent="create()">
         <label for="title">Title</label>
         <input name="title" id="title" type="text" required>

         <div id="options">
            <div>
               <label for="optionOne">Option 1</label>
               <input name="optionOne" id="optionOne" type="text" required>
            </div>

            <div>
               <label for="optionTwo">Option 2</label>
               <input name="optionTwo" id="optionTwo" type="text" required>
            </div>

            <div>
               <label for="optionThree">Option 3</label>
               <input name="optionThree" id="optionThree" type="text">
            </div>

            <div>
               <label for="optionFour">Option 4</label>
               <input name="optionFour" id="optionFour" type="text">
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
