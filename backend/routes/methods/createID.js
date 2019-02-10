module.exports = {

   /**
    * @description Generates a random ID consisting of numbers and uppercase/lowercase letters.
    * 
    * @return id {String} The 5 digit generated unique ID.
    */
   createID(){

   let id = "";

   // generate random ID
   for (let i = 0; i < 6; i++) {

      const r = Math.random();

      // choose if number or letter
      if (r > 0.55) {

         // choose if uppercase or lowercase letter
         const alpha = Math.random() > 0.5 ? 65 : 97;

         // Chooses random character
         const char = alpha + (Math.floor(Math.random() * 26));

         // Converts integer to character.
         id += String.fromCharCode(char);
      } else {
         const num = Math.floor(Math.random() * 9);
         id += num.toString();
      }
   }

   return id;
   },
   
}