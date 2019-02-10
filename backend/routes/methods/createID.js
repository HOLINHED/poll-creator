module.exports = {

   createID(){

   let id = "";

   // generate random ID
   for (let i = 0; i < 6; i++) {

      const r = Math.random();

      if (r > 0.55) {

         // uppercase or lowercase letter
         const alpha = Math.random() > 0.5 ? 65 : 97;

         const char = alpha + (Math.floor(Math.random() * 26));

         id += String.fromCharCode(char);
      } else {
         const num = Math.floor(Math.random() * 9);
         id += num.toString();
      }
   }

   return id;
   }
}