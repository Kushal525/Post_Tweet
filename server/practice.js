let ts = Date.now();

let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
let hour = date_ob.getHours();
let minutes = date_ob.getMinutes()
let miliseconds = date_ob.getSeconds()

// prints date & time in YYYY-MM-DD format
console.log(date_ob);
const h = new Date();
console.log(h)