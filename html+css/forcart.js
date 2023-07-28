const dbURL = 'https://my-json-server.typicode.com/mrkiley/cwb2023-onlineshop/db';

// Create async function;
async function getDB(url) {
  return await fetch(url).then(response => response.json());
}

// Event for upload of page;
window.addEventListener('load', () => {
  getDB(dbURL)
  .then(database => {
    //Choose random user;
    let user = database.users[Math.floor(Math.random() * database.users.length)];
    console.log(user.givenName, user.familyName);
    //Choose random number from 5 to 10;
    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; 
    }

    let randomnumber = getRandomIntInclusive(5, 10);
    console.log(randomnumber);
// Create a array for all vegetables in our database;
    let products = database.products.filter(x => x.category === 'vegetable').sort((a, b) => a.name > b.name);
  console.log(products);

//Create and call function for choosing random n elements in Array;
    function getRandom(arr, n) {
      let result = new Array(n),
          len = arr.length,
          taken = new Array(len);cl
      if (n > len)
          throw new RangeError("getRandom: more elements taken than available");
      while (n--) {
          let x = Math.floor(Math.random() * len);
          result[n] = arr[x in taken ? taken[x] : x];
          taken[x] = --len;
      }
      return result;
  }
  
  let myNewArrayOfRandoms = getRandom(products, randomnumber);
  console.log(myNewArrayOfRandoms);
  
  //create imges on forcat.html for choosing random vegetables;
  let newrandomimages = [];
  for (let key in myNewArrayOfRandoms) {
      
  
      newrandomimages.push(myNewArrayOfRandoms[key].image);
      console.log(myNewArrayOfRandoms[key].image);
      //consoled random vegetables and their prices;
      console.log(myNewArrayOfRandoms[key].name + ':' + ' ' + myNewArrayOfRandoms[key].price + '$');
  }
  
  const container = document.getElementById('image-container');
    for (let i = 0; i < newrandomimages.length; i++) {
      const img = document.createElement('img');
      img.src = newrandomimages[i];
      container.appendChild(img);
    
  }
//calculated of all prices for random vegetables;
const summ = myNewArrayOfRandoms.reduce((accumulator, object) => {
  return accumulator + object.price;
  }, 0);
 
  let sum = (summ * 100)/100;
  console.log('sum' + '=' + ' ' + sum + '$');
  //calculated tax;
  const tax = (sum * 100 * 0.1)/100;
  console.log('tax' + '=' + ' ' + tax + '$');
  //calculated total sum;
  const total = (sum * 100 + tax * 100)/100;
  console.log('total' + '=' + ' ' + total + '$');
   });
});